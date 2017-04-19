import React, {Component} from 'react';
const Highcharts = require('highcharts');


class Chart extends Component {


    Chart() {
        const { feature, alias} = this.props

        if (feature != null) {

            console.log('alias >>', alias)
            // let newData = dataNest.map(item => {
            //     console.log(item)
            //     return {
            //         name: alias[item.key],
            //         data: item.values.data
            //     }
            // })

            let myData = [
                {
                    name: alias,
                    data: [+feature.year_13, +feature.year_14, +feature.year_15]
                }
            ];

            console.log('nyData >>', myData);

            Highcharts.chart('item_chart', {
                colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],

                title: {
                    text: alias
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
                    // enabled: false,
                    text: 'Енциклопедія територій',
                    href: 'http://enter.co.ua'
                },

                // navigation: {
                //     buttonOptions: {
                //         enabled: false
                //     }
                // },

                // subtitle: {
                //     text: ''
                // },

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
                    crosshair: true
                },

                tooltip: {
                    shared: true,
                },

                plotOptions: {
                    series: {
                        pointStart: 2014
                    }
                },

                series: myData

            });
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
                    <div className="map_heder_title">Аналітика1</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"/>
                </div>
                <div className="item_content" id="item_chart"/>
            </div>
        )

    }
}

export default Chart







