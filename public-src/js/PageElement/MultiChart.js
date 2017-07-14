import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';

const Highcharts = require('highcharts');

const aliasMultiChart = {
    holodnavoda: 'Обсяг споживання холодної води, кб.м',
    haryachavoda: 'Обсяг споживання гарячої води, кб.м',
    uchniv: 'Кількість учнів'
};

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


class MultiChart extends Component {

    componentDidMount() {
        this.getMultiChart()
    }

    componentDidUpdate() {
        this.getMultiChart()
    }

    toggleChart() {

        const {barChartToggle} = this.props.MapActions;
        barChartToggle(this.props.map_reducer.bar_chart_full);
        if (!this.props.map_reducer.bar_chart_full) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
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
        chartData.reverse();
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
    render() {
        const {bar_chart_full,chart_full} = this.props.map_reducer;
        const chartDiv = <div ref="multiChart" className="multiChart" onMouseMove={::this.handlerOnMouseMove}>
            <div id="chart0" className="item_bar_chart"/>
            <div id="chart1" className="item_bar_chart"/>
            <div id="chart2" className="item_bar_chart"/>
        </div>;
        const chartStyle = (chart_full) ? `disabled` : ``;

        return (
            <div className={bar_chart_full ? `chart_2 barChart_full` : `chart_2 ${chartStyle}`}>
                {/*Title for right Trend BarChart*/}
                <div className="item_header" >
                    <div className="map_heder_title">Тренд</div>
                    <div className="icon-container" onClick={ ::this.toggleChart }>
                        <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                    </div>
                </div>


                {/*Right Trend BarChart*/}
                <div className="item_content">
                    <div ref='chartDiv' id="item_bar_chart" className="item_bar_chart">
                        {chartDiv}
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiChart);