import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';
import {region} from './region_null'
const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

higchartsDrilldown(Highcharts);
let myChart = null;
let dataStore = {};
let alias_series = {

    naodnohouchnya: 'Загальні видатки в розрахунку на одного учня',
    // uchni: 'Загальна кількість учнів',
    zarplnarahuvnaodnogo: 'Видатки на оплату праці в розрахунку на одного учня',
    tepolonaodnogo: 'Видатки на теплопостачання в розрахунку на одного учня',
    elektroenergynaodnogo: 'Видатки на електроенергію в розрахунку на одного учня',
    waternaodnogo: 'Видатки на водопостачання в розрахунку на одного учня'


};

class BarChart extends Component {

    toggleChart() {
        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_cahrt_full);
    }

    createChart(full = null) {
        // save props
        const {alias, properties, data_success, chart2, bar_cahrt_full, dataChartRegion} = this.props.map_reducer;
        const {range_item, range_items, submenu_item} = this.props.main;
        let curent_year = range_items[range_item] || 'year_13';
        let parametr;

        //check to hav region in props
        if (data_success && properties && dataChartRegion) {

            if ('__district' in properties) {
                parametr = properties.__district[0].parameter
            } else if ('__region' in properties) {
                parametr = properties.__region[0].parameter
            }

            let district = {};
            if (!dataStore[submenu_item + curent_year + '__district'] && '__district' in properties) {


                dataStore[submenu_item + curent_year + '__district'] = [];
                properties.__district.forEach(item => {

                    district[item.koatuu.slice(0, 2)] ? '' : district[item.koatuu.slice(0, 2)] = [];

                    let _item = district[item.koatuu.slice(0, 2)];

                    _item.push([item.name_ua, +item[curent_year]])

                });

                for (let key in district) {
                    if (district.hasOwnProperty(key)) {
                        district[key].sort((a, b) => b[1] - a[1]);
                        district[key] = district[key].map((item, i) => {
                            item[0] = item[0] + `  (${ i + 1 })`
                            return item
                        })
                    }
                }

                for (let key in district) {
                    if (district.hasOwnProperty(key)) {
                        let obj = {};
                        obj.id = key;
                        obj.name = alias;
                        obj.data = district[key];
                        obj.negativeColor = '#e74c3c';
                        obj.color = '#27ae60';
                        obj.maxPointWidth = 25;

                        dataStore[submenu_item + curent_year + '__district'].push(obj);
                    }
                }
            }


            if (!dataStore[submenu_item + curent_year + '__region'] && '__region' in properties) {
                // sort data to enable labels
                properties.__region.sort((a, b) => b[curent_year] - a[curent_year]);
                let i = 1;

                dataStore[submenu_item + curent_year + '__region'] = properties.__region.map(item => {
                    let obj = {};
                    obj.name = item.name_ua + `  (${ i })`;
                    obj.y = +item[curent_year];
                    obj.drilldown = item.koatuu.slice(0, 2);
                    i++;
                    return obj
                });
            } else if ('__region' in properties === false) {
                dataStore[submenu_item + curent_year + '__region'] = region
            }

            // Create the chart
            myChart = Highcharts.chart('item_bar_chart', {
                lang: {
                    drillUpText: 'Назад'
                },
                chart: {
                    type: 'bar'
                },
                credits: {
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua',
                    enabled: false
                },
                title: {
                    text: alias + ', ' + parametr + ', 20' + curent_year.substring(5) + 'р.'
                },
                xAxis: {
                    type: 'category',
                },

                legend: {
                    enabled: false
                },
                yAxis: {
                    title: {
                        enabled: false
                    }

                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        // minPointLength: 3,
                        dataLabels: {
                            enabled: bar_cahrt_full
                        }
                    }
                },

                series: [{
                    name: alias,
                    maxPointWidth: 25,
                    // colorByPoint: true,
                    data: full ? dataStore[submenu_item + curent_year + '__region'] : dataStore[submenu_item + curent_year + '__region'].slice(0, 5),
                    negativeColor: '#e74c3c',
                    color: '#27ae60',

                }],
                drilldown: {
                    drillUpButton: {
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        zones: [{
                            value: 0,
                            color: '#e74c3c'
                        }, {
                            color: '#27ae60'
                        }],
                        theme: {

                            'stroke-width': 1,
                            stroke: 'gray',
                            r: 6,
                            states: {
                                hover: {
                                    fill: 'lightgray'
                                },
                                select: {
                                    stroke: '#555',
                                    fill: '#e74c3c'
                                }
                            }
                        }

                    },
                    series: dataStore[submenu_item + curent_year + '__district'] || []
                }
            });
        }
        else if (data_success && properties && '__district' in properties && !dataChartRegion) {

            if (!dataStore[submenu_item + curent_year]) {

                properties.__district.sort((a, b) => b[curent_year] - a[curent_year]);
                let i = 1;

                dataStore[submenu_item + curent_year] = properties.__district.map(item => {
                    let obj = {};
                    obj.name = item.name_ua + `  (${ i })`;
                    obj.y = +item[curent_year];
                    i++
                    return obj
                });
            }

            // Create the chart
            myChart = Highcharts.chart('item_bar_chart', {
                lang: {
                    drillUpText: 'Назад'
                },
                chart: {
                    type: 'bar',
                    height: full ? dataStore[submenu_item + curent_year].length * 25 : null,
                },
                credits: {
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua',
                    enabled: false
                },
                title: {
                    text: alias + ', ' + properties.__district["0"].parameter + ', 20' + curent_year.substring(5) + 'р.'
                },
                xAxis: {
                    type: 'category',
                },

                legend: {
                    enabled: false
                },
                yAxis: {
                    title: {
                        enabled: false
                    }

                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: bar_cahrt_full
                        }
                    }
                },

                series: [{
                    name: alias,
                    // colorByPoint: true,
                    data: full ? dataStore[submenu_item + curent_year] : dataStore[submenu_item + curent_year].slice(0, 5),
                    zones: [{
                        value: 0,
                        color: '#e74c3c'
                    }, {
                        color: '#27ae60'
                    }]
                }],
            });

        }
        else if (!data_success && myChart !== null && chart2 === null) {
            myChart.destroy();
            myChart = null
        } else if (chart2 !== null) {
            let myData = [];
            let labels = [];
            let i = 0;


            for (let key in chart2) {
                if (chart2.hasOwnProperty(key)) {

                    let obj = {
                        name: alias_series[key] || key,
                        data: []
                    };

                    chart2[key].forEach(item => {
                        obj.data.push(item.value);
                        i === 0 ? labels.push(`${ item.year }р`) : ''
                    });
                    i++;
                    myData.push(obj)
                }
            }

            myChart = Highcharts.chart('item_bar_chart', {
                colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],

                exporting: {
                    buttons: {
                        exportButton: {
                            symbol: 'url(http://highcharts.com/demo/gfx/sun.png)',
                            symbolX: 5,
                            symbolY: 0
                        }
                    }
                },
                title: {
                    text: 'Витрати  шкільного бюджету в розрахунку на одного учня'
                },
                chart: {
                    type: 'line',
                    marginRight: 20
                },
                credits: {
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua',
                    enabled: false
                },
                yAxis: {
                    title: {
                        text: 'грн.'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                xAxis: {
                    crosshair: true,
                    categories: labels
                },
                tooltip: {
                    shared: true,
                },
                series: myData
            });
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        this.createChart(this.props.map_reducer.bar_cahrt_full)
    }

    toggleChartData() {
        this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)
    }

    render() {
        const {bar_cahrt_full, chart2, dataChartRegion} = this.props.map_reducer;
        return (
            <div className={bar_cahrt_full ? 'chart_2 barChart_full' : 'chart_2'}>
                <div className="item_header">
                    <div className="map_heder_title">{chart2 ? 'Тренд' : 'Діаграма-рейтинг (ТОП-5)'}</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content">
                    <div>Області
                        {chart2 ? '' : <i className={ !dataChartRegion ? "fa fa-toggle-on" : 'fa fa-toggle-on fa-flip-horizontal' }
                                          onClick={ ::this.toggleChartData } />} Райони
                    </div>
                    <div id="item_bar_chart"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        map_reducer: state.map_reducer,
        main: state.main
    }
}

function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


