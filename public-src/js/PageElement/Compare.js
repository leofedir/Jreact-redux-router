import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';

import {compareChart, clearSelectionChart}  from '../Function/compareChart'

const Highcharts = require('highcharts');

class Compare extends Component {
    componentDidUpdate() {
        console.log('did update Compare component');
        clearSelectionChart();
        this.createChart();
    }
    

    getRowsCompare() {
        const {alias, curency, feature} = this.props.map_reducer;
        const {range_items, range_item, item_name} = this.props.main;
        let curentYear = range_items[range_item];
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
        let self = this;
        
        function getItems(keyi) {
            let t = []
            compareSet.forEach((item, i1) => {
                if (i <= 1 ) {
                    t.push(<td key={i + i1}>{item[keyi]}</td>)
                } else if (i === Object.values(rows).length-1) {
                    t.push(<td key={i + i1}>
                        <i onClick={() => ::self.handleDeleteArea(item)} className="fa fa-times ui-exit" aria-hidden="true"></i>
                    </td>)
                } else {
                    t.push(<td key={i + i1}>{format(item[keyi])}</td>)
                }

            })
            
            return t
        }

        for (let key in rows) {
            if (rows.hasOwnProperty(key)) {
                tempArr.push(
                    <tr key={i}>
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
    
    handleDeleteArea(e) {
        const {compareSet} = this.props.map_reducer;
        const {click_on_compare_feature} = this.props.MapActions;
        const {showCompareFunc} = this.props.Actions;
        // check if e.id === key of Map
        // and if true delete item from Map
        click_on_compare_feature(compareSet, e)
        
        if (compareSet.size < 2) {
            showCompareFunc(false)
        }
    };

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
            };
            for (let key in item) {
                if (item.hasOwnProperty(key) && key.indexOf(curency.toLowerCase() + 'year') === 0) {
                    obj.data.push(+item[key])
                }
            }
            myData.push(obj)
        });

        let chart = Highcharts.chart('item_chart_compare', {
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
                // valueSuffix: ' ' + tooltipParametr,
                formatter: function() {
                    var s = [];
                    let d = Object.values(this.points).sort(function(a,b){return b.y-a.y})

                    d.map((i,iter) => {
                        let fillColor = i.color;
                        s.push(`<tspan style="fill:${fillColor}" x="8" dy="15">●</tspan> `+'<span>'+ i.series.name +' : '+
                            i.y + '</span>' + '<span> ' + tooltipParametr + '</span>'+'<br>') ;
                    });

                    return s
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    marker: {
                        states: {
                            select: {
                                fillColor: '#f00',
                                lineWidth: 0,
                                enabled: true
                            }
                        }
                    },
                    events: {
                        click: e => {
                            compareChart(e, feature, chart)
                        }
                    }
                }
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

function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch),
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Compare);








