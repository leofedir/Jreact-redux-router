import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';
const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

higchartsDrilldown(Highcharts);

let bar = null;

class BarChart extends Component {

    toggleChart() {
        const { barChartToggle } = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_cahrt_full)
    }

    createChart() {
        const { alias, properties, data_success} = this.props.map_reducer;
        
        if (data_success && properties.__region != undefined) {

            bar = null;

            let newData = properties.__region.map(item => {
                let obj = {};
                obj.name = item.name_ua;
                obj.y = +item.year_13
                return obj
            })

            // Create the chart
            bar = Highcharts.chart('item_bar_chart', {
                lang: {
                    drillUpText: 'Назад до {series.name}'
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
                    text: alias
                },
                xAxis: {
                    type: 'category'
                },

                legend: {
                    enabled: false
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
                    color: '#fccc0e'
                }],
                drilldown: {
                    drillUpButton: {
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        theme: {
                            fill: 'white',
                            'stroke-width': 1,
                            stroke: 'silver',
                            r: 0,
                            states: {
                                hover: {
                                    fill: '#a4edba'
                                },
                                select: {
                                    stroke: '#039',
                                    fill: '#a4edba'
                                }
                            }
                        }

                    },
                    series: [{
                        id: 'animals',
                        data: [
                            ['Cats', 4],
                            ['Dogs', 2],
                            ['Cows', 1],
                            ['Sheep', 2],
                            ['Pigs', 1]
                        ]
                    }, {
                        id: 'fruits',
                        data: [
                            ['Apples', 4],
                            ['Oranges', 2]
                        ]
                    }, {
                        id: 'cars',
                        data: [
                            ['Toyota', 4],
                            ['Opel', 2],
                            ['Volkswagen', 2]
                        ]
                    }]
                }
            });
        } else {
            bar != null ? bar.destroy() : ''
        }

    }

    componentDidMount() {
        this.createChart()
    }

    componentDidUpdate() {
        bar === null ? this.createChart() : ''
    }

    render() {
        const {bar_cahrt_full} = this.props.map_reducer;
        return (
            <div className={bar_cahrt_full ? 'chart_2 barChart_full' : 'chart_2'}>
                <div className="item_header">
                    <div className="map_heder_title">Діаграма</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content" id="item_bar_chart"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


