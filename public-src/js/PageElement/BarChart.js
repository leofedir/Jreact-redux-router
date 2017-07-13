import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';
import {region} from './region_null';
import {propertiesMain} from '../getMapArea';

const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

const aliasMultiChart = {
    holodnavoda: 'Обсяг споживання холодної води, кб.м',
    haryachavoda: 'Обсяг споживання гарячої води, кб.м',
    uchniv: 'Кількість учнів'
};

let myCurency = '';
let storeParametr;

higchartsDrilldown(Highcharts);
let myChart = null;
let dataStore = {};

Highcharts.Point.prototype.highlight = function (event) {
    this.onMouseOver(); // Show the hover marker
    // this.series.chart.tooltip.refresh(); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

// Highcharts.Pointer.prototype.reset = function () {
//     return undefined;
// };

function syncExtremes(e) {
    let thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop z
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'});
                }
            }
        });
    }
}

class BarChart extends Component {

    toggleChart() {

        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_chart_full);
        if (!this.props.map_reducer.bar_chart_full) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    createChart(full = null) {

        console.log('propertiesMain >>', propertiesMain)

        // save props
        const {alias, data_success, chart3, dataChartRegion, curency} = this.props.map_reducer;
        const {range_item, range_items, submenu_item, item_name} = this.props.main;
        let curent_year = range_items[range_item] || 'year_13';
        let yearToTitlaChart = item_name[range_item];
        let parametr;

        if (data_success && propertiesMain && dataChartRegion) {
            storeParametr = submenu_item + curency.toLowerCase() + curent_year;

            if ('__district' in propertiesMain) {
                parametr = curency == '' ? propertiesMain.__district[0].properties.parameter : curency
            } else if ('__region' in propertiesMain) {
                parametr = curency == '' ? propertiesMain.__region[0].properties.parameter : curency
            }

            myCurency = curency.toLowerCase()

            let district = {};

            if (!dataStore[storeParametr + '__district'] && '__district' in propertiesMain) {

                dataStore[storeParametr + '__district'] = [];
                propertiesMain.__district.forEach(item => {
                    district[item.properties.koatuu.slice(0, 2)] ? '' : district[item.properties.koatuu.slice(0, 2)] = [];

                    let _item = district[item.properties.koatuu.slice(0, 2)];

                    _item.push([item.properties.name_ua, +item.properties[myCurency + curent_year]])

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

                        dataStore[storeParametr + '__district'].push(obj);
                    }
                }
            }

            if (!dataStore[storeParametr + '__region'] && '__region' in propertiesMain) {
                // sort data to enable labels
                propertiesMain.__region.sort((a, b) => b.properties[myCurency + curent_year] - a.properties[myCurency + curent_year]);
                let i = 1;

                dataStore[storeParametr + '__region'] = propertiesMain.__region.map(item => {
                    let obj = {};
                    obj.name = item.properties.name_ua + `  (${ i })`;
                    obj.y = +item.properties[myCurency + curent_year];
                    obj.drilldown = item.properties.koatuu.slice(0, 2);
                    i++;
                    return obj
                });
            } else if ('__region' in propertiesMain === false) {
                dataStore[storeParametr + '__region'] = region
            }
            // Create the chart
            myChart = Highcharts.chart('item_bar_chart', {
                lang: {
                    drillUpText: '\uf0a8'
                },
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'bar'
                },
                title: {
                    text: alias + ', ' + parametr + ', ' + yearToTitlaChart + 'р.'
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
                            enabled: full
                        }
                    }
                },
                series: [{
                    name: alias,
                    maxPointWidth: 25,
                    data: full ? dataStore[storeParametr + '__region'] : dataStore[storeParametr + '__region'].slice(0, 5),
                    negativeColor: '#e74c3c',
                    color: '#27ae60'
                }],
                drilldown: {
                    drillUpButton: {
                        relativeTo: 'spacingBox',
                        position: {
                            y: -4,
                            x: -40
                        },
                        theme: {
                            height: -16,
                            width: -16,
                            'stroke-width': 0,
                            r: 0,
                            'font-family': 'FontAwesome',
                            'font-size': '24px',
                        },
                    },
                    series: dataStore[storeParametr + '__district'] || []
                }
            });
        }
        else if (data_success && propertiesMain && '__district' in propertiesMain && !dataChartRegion) {

            parametr = curency == '' ? propertiesMain.__district[0].properties.parameter : curency
            myCurency = curency.toLowerCase()

            storeParametr = submenu_item + curency.toLowerCase() + curent_year;

            if (!dataStore[storeParametr]) {

                propertiesMain.__district.sort((a, b) => b.properties[myCurency + curent_year] - a.properties[myCurency + curent_year]);
                let i = 1;

                dataStore[storeParametr] = propertiesMain.__district.map(item => {
                    let obj = {};
                    obj.name = item.properties.name_ua + `  (${ i })`;
                    obj.y = +item.properties[myCurency + curent_year];
                    i++;
                    return obj
                });
            }

            // Create the chart
            myChart = Highcharts.chart('item_bar_chart', {
                lang: {
                    drillUpText: '\uf0a8'
                },
                chart: {
                    type: 'bar',
                    height: full ? dataStore[storeParametr].length * 25 : null,
                },
                credits: {
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua',
                    enabled: false
                },
                title: {
                    text: alias + ', ' + parametr + ', ' + yearToTitlaChart + 'р.'
                },
                xAxis: {
                    type: 'category',
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    title: {
                        // enabled: false
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: full
                        }
                    }
                },
                series: [{
                    name: alias,
                    data: full ? dataStore[storeParametr] : dataStore[storeParametr].slice(0, 5),
                    zones: [{
                        value: 0,
                        color: '#e74c3c'
                    }, {
                        color: '#27ae60'
                    }]
                }]
            });

        }
        else if (!data_success && myChart !== null && chart3 === null) {
            myChart.destroy();
            myChart = null
        }
    }

    handlerOnMouseMove(e) {

        let chart,
            point,
            i = Highcharts.charts.length - 3,
            lenth = Highcharts.charts.length,
            event;

        for (i; i < lenth; i++) {
            if (Highcharts.charts[i] !== undefined) {
                chart = Highcharts.charts[i];
                event = chart.pointer.normalize(e.nativeEvent); // Find coordinates within the chart
                point = chart.series[0].searchPoint(event, true); // Get the hovered point
                if (point) {
                    point.highlight(e.nativeEvent);
                }
            }
        }
    }

    getMultiChart() {
        const {chart3} = this.props.map_reducer;
        const chartData = [];
        const chartType = ['line', 'area', 'area'];
        const units = ['осіб', 'кб.м', 'кб.м'];
        const year_labels = ['2014 р', '2015 р', '2016 р'];
        const colors = ['#7cb5ec', '#f7a35c', '#90ee7e'];


        for (let key in chart3) {

            if (chart3.hasOwnProperty(key)) {
                let obj = {
                    name: key,
                    data: []
                };
                chart3[key].forEach(item => {
                    obj.data.push(item.value)
                });

                chartData.push(obj)
            }
        }

        let HTML = [];
        chartData.reverse()
        chartData.forEach((dataset, i) => {

                HTML.push(<div key={i} id={'chart' + i}/>);

                let options = new Object({
                    chart: {
                        marginLeft: 45, // Keep all charts left aligned
                        spacingTop: 20,
                        marginRight: 20,
                        spacingBottom: 20,
                        renderTo: 'chart' + i
                    },
                    title: {
                        text: aliasMultiChart[dataset.name],
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        categories: year_labels
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width - 20, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '18px'
                        },
                        valueDecimals: dataset.valueDecimals
                    },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: chartType[i],
                        color: colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
                            valueSuffix: ' ' + units[i]
                        }
                    }]
                });

                new Highcharts.Chart(options)
            }
        );
    }

    componentDidUpdate() {
        this.createChart(this.props.map_reducer.bar_chart_full)
        this.props.map_reducer.chart3 !== null ? this.getMultiChart() : null
    }

    componentWillUpdate() {
        window.scrollTo(0,0);
    }


    toggleChartData() {
        this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)
    }

    render() {
        const {bar_chart_full, chart3, dataChartRegion, data_success, bubble_chart_full, chart_full, claster} = this.props.map_reducer;
        const chartDiv = <div ref="multiChart" className="multiChart" onMouseMove={::this.handlerOnMouseMove}>
            <div id="chart0" className="item_bar_chart"/>
            <div id="chart1" className="item_bar_chart"/>
            <div id="chart2" className="item_bar_chart"/>
        </div>;
        const chartStyle = (bubble_chart_full || chart_full) ? `disabled` : ``;

        return (
            <div className={bar_chart_full ? `chart_2 barChart_full` : `chart_2 ${chartStyle}`}>
                {/*Title for right Trend BarChart*/}
                <div className="item_header" >
                    <div className="map_heder_title">
                        {chart3 || !propertiesMain ? 'Тренд' : 'Діаграма-рейтинг (ТОП-5)'}
                    </div>
                    <div className="icon-container" onClick={ ::this.toggleChart }>
                        <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                    </div>
                </div>

                {/*Right Trend BarChart*/}
                <div className="item_content">
                    {/*<div className="region_toggle"*/}
                         {/*style={propertiesMain === null && !data_success || claster ? {display: 'none'} : {display: 'block'}}*/}
                         {/*onClick={::this.toggleChartData}>*/}
                        {/*<div className="region_toggle_item">Області*/}
                            {/*{chart3 ? '' :*/}
                                {/*<i className={ !dataChartRegion ? "fa fa-toggle-on" : 'fa fa-toggle-on fa-flip-horizontal' }/>}Райони*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div ref='chartDiv' id="item_bar_chart" className="item_bar_chart">
                        {chart3 !== null ? chartDiv : null}
                    </div>
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
        MapActions: bindActionCreators(MapActions, dispatch),
        Actions: bindActionCreators(Actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);