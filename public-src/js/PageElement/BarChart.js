import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';
import {region} from './region_null';
import {propertiesMain} from '../getMapArea';

const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

higchartsDrilldown(Highcharts);

let myCurency = '';
let storeParametr;

let myChart = null;
let dataStore = {};

class BarChart extends PureComponent {

    toggleChart() {
        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_chart_full);
        if (!this.props.map_reducer.bar_chart_full) {
            document.body.style.overflow = 'hidden'
            this.refs.fullChart.onscroll = e => {
                console.log("scrolling", e.srcElement.scrollTop);
            };
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    createChart(full = null) {
        const {alias, data_success, dataChartRegion, curency} = this.props.map_reducer;
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
        else if (!data_success && myChart !== null) {
            myChart.destroy();
            myChart = null
        }
    }

    componentDidUpdate() {
        this.createChart(this.props.map_reducer.bar_chart_full)
    }

    componentDidMount() {
        if (this.props.map_reducer.compareSet.size <= 2) {
            setTimeout(() => {
                this.createChart()
            }, 200)

        }
    }

    componentWillUpdate() {
        this.createChart(this.props.map_reducer.bar_chart_full);
        window.scrollTo(0,0);
    }

    render() {
        const {bar_chart_full, chart3, bubble_chart_full, chart_full} = this.props.map_reducer;
        const chartStyle = (bubble_chart_full || chart_full) ? `disabled` : ``;

        return (
            <div ref='fullChart' className={bar_chart_full ? `chart_2 barChart_full` : `chart_2 ${chartStyle}`}>
                <div className="item_header" >
                    <div className="map_heder_title">
                        {chart3 || !propertiesMain ? 'Тренд' : 'Діаграма-рейтинг (ТОП-5)'}
                    </div>
                    <div className="icon-container" onClick={ ::this.toggleChart }>
                        <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                    </div>
                </div>
                <div className="item_content">
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