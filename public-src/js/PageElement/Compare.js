import React, {Component} from 'react';
import {connect} from 'react-redux';

const Highcharts = require('highcharts');

class Compare extends Component {

    getRowsCompare() {
        const {alias, curency, feature} = this.props.map_reducer;
        const {range_items, range_item, item_name} = this.props.main;
        let curentYear = range_items[range_item]
        return {
            name_ua: 'Назва території',
            koatuu: 'Код КОАТУУ',
            population: 'Населення (01.01.2017р.), осіб',
            area: 'Площа території, га',
            [curency.toLowerCase() + curentYear]: `${alias} на ${item_name[range_item] } р., ${curency == "" ? feature.parameter : curency}`
        }
    }

    getInfoCompare() {
        const {compareSet} = this.props.map_reducer;
        let tempArr = [];
        let rows = this.getRowsCompare();
        let i = 0;
        const format = new Intl.NumberFormat().format;

        function getItems(keyi) {
            let t = []
            compareSet.forEach(item => {
                if (i <= 1 ) {
                    t.push(<td>{item[keyi]}</td>)
                } else {
                    t.push(<td>{format(item[keyi])}</td>)
                }

            })
            return t
        }


        for (let key in rows) {
            if (rows.hasOwnProperty(key)) {
                tempArr.push(
                    <tr>
                        <td>
                            {rows[key]}
                        </td>
                        {getItems(key)}
                    </tr>
                )
                i++;
            }
        }
        return tempArr
    }

    componentDidUpdate() {
        this.createChart()
    }

    componentDidMount() {
        this.createChart()
    }

    createChart() {
        const {curency, compareSet, feature} = this.props.map_reducer;
        const {item_name} = this.props.main;

        let tooltipParametr = curency == "" ? feature.parameter : curency
        let myData = [];

        compareSet.forEach((item, i) => {
            let obj = {
                name: item.name_ua,
                data: []
            }
            for (let key in item) {
                if (item.hasOwnProperty(key) && key.indexOf(curency.toLowerCase() + 'year') === 0) {
                    obj.data.push(+item[key])
                }
            }
            myData.push(obj)
        });


        Highcharts.chart('item_chart_compare', {
            // colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],
            title: {
                text: 'Порівняння територій'
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
                    text: null
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            xAxis: {
                crosshair: true,
                categories: item_name
            },
            tooltip: {
                shared: true,
                hideDelay: 100,
                valueSuffix: ' ' + tooltipParametr
            },
            series: myData
        });
    }


    render() {
        return (
            <div className="compareCahrt">
                <div className="item_header">
                    <div className="map_heder_title">Порівняння територій</div>

                </div>
                <div className="item_content">
                    <table>
                        <tbody>
                        {::this.getInfoCompare()}
                        </tbody>
                    </table>
                </div>
                <div id="item_chart_compare"/>
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

export default connect(mapStateToProps)(Compare);








