import React, {Component} from 'react';
import { year_labels, dataToChart} from './Popup'

const Highcharts = require('highcharts');

let chart = null;

class Chart extends Component {

    Chart() {
        const { feature, alias} = this.props

        if (feature != null) {

            let myData = [
                {
                    name: alias,
                    data: dataToChart
                }
            ];

            chart = Highcharts.chart('item_chart', {
                colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],
                title: {
                    text: feature.name_ua
                },
                exporting: {
                    buttons: {
                        exportButton: {
                            symbol: 'url(http://highcharts.com/demo/gfx/sun.png)',
                            symbolX: 5,
                            symbolY: 0
                        }
                    }
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
                        text: feature.parameter
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                xAxis: {
                    crosshair: true,
                    categories: year_labels
                },
                tooltip: {
                    shared: true,
                },
                series: myData
            });
        } else {
            chart != null ? chart.destroy() : ''
        }
    }

    componentDidMount() {
        this.Chart()
    }

    componentDidUpdate() {
        this.Chart()
    }

    render() {
        return (
            <div className="chart_1">
                <div className="item_header">
                    <div className="map_heder_title">Тренд</div>
                </div>
                <div className="item_content" id="item_chart"/>
            </div>
        )

    }
}

export default Chart







