import React, {Component} from 'react';
const Highcharts = require('highcharts');
const higchartsDrilldown = require('highcharts/modules/drilldown.js');

higchartsDrilldown(Highcharts);

class BarChart extends Component {
    createChart() {
        // Create the chart
        Highcharts.chart('item_bar_chart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Basic drilldown'
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
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Things',
                colorByPoint: true,
                data: [{
                    name: 'Animals',
                    y: 5,
                    drilldown: 'animals'
                }, {
                    name: 'Fruits',
                    y: 2,
                    drilldown: 'fruits'
                }, {
                    name: 'Cars',
                    y: 4,
                    drilldown: 'cars'
                }]
            }],
            drilldown: {
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

    }

    componentDidMount() {
        this.createChart()
    }

    componentDidUpdate() {
        this.createChart()
    }

    render() {
        return (
            <div className="chart_2">
                <div className="item_header">
                    <div className="map_heder_title">Діаграма</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                </div>
                <div className="item_content" id="item_bar_chart"/>
            </div>
        )
    }
}

export default BarChart


