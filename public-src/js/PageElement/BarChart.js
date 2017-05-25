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
// let alias_series = {

// };
Highcharts.Point.prototype.highlight = function (event) {
    console.log('this >>', this)
    this.onMouseOver(); // Show the hover marker
    // this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                }
            }
        });
    }
}

class BarChart extends Component {

    toggleChart() {
        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_chart_full);
    }

    createChart(full = null) {
        // save props
        const {alias, properties, data_success, chart3, bar_cahrt_full, dataChartRegion} = this.props.map_reducer;
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
                    drillUpText: '\uf0a8'
                },
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'bar'
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
                    data: full ? dataStore[submenu_item + curent_year + '__region'] : dataStore[submenu_item + curent_year + '__region'].slice(0, 5),
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
                    data: full ? dataStore[submenu_item + curent_year] : dataStore[submenu_item + curent_year].slice(0, 5),
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

    handlerOnMouseMuve(e) {

        let chart,
            point,
            i,
            event;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            if (Highcharts.charts[i] !== undefined) {
                chart = Highcharts.charts[i];
                event = chart.pointer.normalize(e.nativeEvent); // Find coordinates within the chart
                console.log('event', event)
                point = chart.series[0].searchPoint(event, true); // Get the hovered point
                console.log('point >>', point)
                if (point) {
                    point.highlight(e.nativeEvent);
                }
            }

        }

    }

    getMultiChart() {


        const {chart3} = this.props.map_reducer



        let chartData = [];
        let chartType = ['line', 'area', 'area']


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

        chartData.forEach((dataset, i) => {
                HTML.push(<div key={i} id={'chart' + i}/>);

                let options = new Object({
                    chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        renderTo: 'chart' + i
                    },
                    title: {
                        text: dataset.name,
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
                        // events: {
                        //     setExtremes: syncExtremes
                        // },
                        labels: {
                            format: '{value} km'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
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
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3
                        // tooltip: {
                        //     valueSuffix: ' ' + dataset.unit
                        // }
                    }]
                })

                new Highcharts.Chart(options)
            }
        );
    }

    componentDidUpdate() {
        this.createChart(this.props.map_reducer.bar_chart_full)
        this.props.map_reducer.chart3 !== null ? this.getMultiChart() : null
    }

    toggleChartData() {
        this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)
    }

    render() {
        const {bar_chart_full, chart3, dataChartRegion, data_success, properties} = this.props.map_reducer;
        const chartDiv = <div ref="multiChart" className="multiChart" onMouseMove={::this.handlerOnMouseMuve}><div id="chart0" className="item_bar_chart"/><div id="chart1" className="item_bar_chart"/><div id="chart2" className="item_bar_chart"/></div>;
        return (
            <div className={bar_chart_full ? 'chart_2 barChart_full' : 'chart_2'}>
                <div className="item_header">
                    <div
                        className="map_heder_title">{chart3 || !properties ? 'Тренд' : 'Діаграма-рейтинг (ТОП-5)'}</div>
                    <div onClick={ ::this.toggleChart }>
                        <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                    </div>
                </div>
                <div className="item_content">
                    <div className="region_toggle"
                         style={properties === null && !data_success ? {display: 'none'} : {display: 'block'}}
                         onClick={::this.toggleChartData}>
                        <div className="region_toggle_item">Області
                            {chart3 ? '' :
                                <i className={ !dataChartRegion ? "fa fa-toggle-on" : 'fa fa-toggle-on fa-flip-horizontal' }/>}Райони
                        </div>
                    </div>
                    <div id="item_bar_chart" className="item_bar_chart">
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
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


