import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';
const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

higchartsDrilldown(Highcharts);
let myChart = null;
let alias_series = {
    dohody: 'Бюджет закладу',
    naodnohouchnya: 'Видатки на одного учня',
    uchni: 'Загальна кількість учнів',
    vnesky: 'Батьківські внески'
};

class BarChart extends Component {

    toggleChart() {
        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_cahrt_full);
    }

    createChart() {
        const {alias, properties, data_success, chart2} = this.props.map_reducer;
        const {range_item, range_items} = this.props.main;

        if (data_success && properties && '__region' in properties) {

            let curent_year = range_items[range_item]

            let district = {};
            let district_arr = [];

            properties.__district.forEach(item => {

                district[item.koatuu.slice(0, 2)] ? '' : district[item.koatuu.slice(0, 2)] = [];

                let _item = district[item.koatuu.slice(0, 2)];

                _item.push([item.name_ua, +item[curent_year]])

            });

            for (let key in district) {
                if (district.hasOwnProperty(key)) {
                    let obj = {};
                    obj.id = key;
                    obj.name = alias;
                    obj.data = district[key].sort((a, b) => b[1] - a[1]);


                    district_arr.push(obj);
                }
            }

            let newData = properties.__region.map(item => {
                let obj = {};
                obj.name = item.name_ua;
                obj.y = +item[curent_year];
                obj.drilldown = item.koatuu.slice(0, 2);
                return obj
            });

            newData.sort((a, b) => b.y - a.y);

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
                    text: alias + ', ' + properties.__district["0"].parameter
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
                            enabled: false
                        }
                    }
                },

                series: [{
                    name: alias,
                    // colorByPoint: true,
                    data: newData,
                    zones: [{
                        value: 0,
                        color: '#e74c3c'
                    }, {
                        color: '#27ae60'
                    }]
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
                    series: district_arr
                }
            });
        } else if (!data_success && myChart !== null && chart2 === null) {
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
                    text: ''
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
        this.createChart()
    }

    componentDidUpdate() {
        this.createChart()
    }

    render() {
        const {bar_cahrt_full, chart2} = this.props.map_reducer;
        return (
            <div className={bar_cahrt_full ? 'chart_2 barChart_full' : 'chart_2'}>
                <div className="item_header">
                    <div className="map_heder_title">{chart2 ? 'Тренд' : 'Діаграма'}</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content" id="item_bar_chart"/>
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


