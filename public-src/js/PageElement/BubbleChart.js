import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';

const Highcharts = require('highcharts');
require('highcharts/highcharts-more.js')(Highcharts);

let chart = null;

class BubbleChart extends Component {

    toggleChart() {
        this.props.MapActions.BubbleChartToggle(this.props.map_reducer.bubble_chart_full);
    }

    componentDidUpdate() {
        this.bubbleChart()
    }

    bubbleChart() {
        const {data_bubble, bubble_chart_full} = this.props.map_reducer;

        if (data_bubble !== null) {



            chart = Highcharts.chart('bubble_chart', {
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                credits: {
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua',
                    enabled: false
                },
                legend: {
                    enabled: false
                },

                title: {
                    text: 'Доходи місцевих бюджетів, населення та площа територій, 2016 р.'
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Населення, осіб'
                    }
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Площа, га'
                    },
                    maxPadding: 0.2
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                    '<tr><th>Населення:</th><td>{point.x} осіб</td></tr>' +
                    '<tr><th>Площа:</th><td>{point.y} га</td></tr>' +
                    '<tr><th>Доходи:</th><td>{point.z} грн.</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            style: bubble_chart_full ? {"fontSize": "15px"} : {"fontSize": "11px"}
                        }
                    }
                },

                series: [{
                    data: bubble_chart_full ? data_bubble : data_bubble.slice(0, 5)
                }]

            });
        } else if (data_bubble === null && chart !== null) {
            chart.destroy();
            chart = null
        }
    }


    render() {
        const {bubble_chart_full, data_bubble} = this.props.map_reducer;

        if (data_bubble === null) {
            return null
        } else {
            return (
                <div className={bubble_chart_full ? 'chart_3 barChart_full' : 'chart_3'}>
                    <div className="item_header">
                        <div className="map_heder_title"/>
                        <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                           onClick={ ::this.toggleChart }/>
                    </div>
                    <div className="item_content">
                        <div id="bubble_chart"/>
                    </div>
                </div>
            )
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(BubbleChart);