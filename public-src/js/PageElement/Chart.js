import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';

import {year_labels, dataToChart} from './Popup'

const Highcharts = require('highcharts');
require('highcharts/highcharts-more.js')(Highcharts);


let chart = null;

let alias_series = {
    budget: 'Бюджет закладу',
    zarplnarahuv: 'Заробітна плата з нарахуваннями',
    teplo: 'Видатки на теплопостачання',
    elektroenergy: 'Видатки на електропостачання',
    water: 'Видатки на водопостачання',
    inshivydatky: 'Інші видатки',
    vnesky: 'Батьківські внески'
};

class Chart extends Component {

    toggleChart() {
        const {ChartToggle} = this.props.MapActions;
        ChartToggle(this.props.map_reducer.cahrt_full);
    }

    Chart() {
        const {feature, alias, chart1, data_bubble, cahrt_full} = this.props.map_reducer;
        const format = new Intl.NumberFormat().format;

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
        } else if (feature !== null, chart !== null && chart1 === null && data_bubble === null) {
            chart.destroy();
            chart = null
        } else if (chart1 !== null) {

            let myData = [];
            let labels = [];
            let i = 0;


            for (let key in chart1) {
                if (chart1.hasOwnProperty(key)) {

                    let obj = {
                        name: alias_series[key] || key,
                        data: []
                    };

                    chart1[key].forEach(item => {
                        obj.data.push(item.value);
                        i === 0 ? labels.push(`${ item.year }р`) : ''
                    });
                    i++;
                    myData.push(obj)
                }
            }

            chart = Highcharts.chart('item_chart', {
                colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],
                title: {
                    text: 'Загальні витрати та доходи шкільного бюджету'
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
                        text: 'грн.'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                xAxis: {
                    crosshair: true,
                    categories: labels
                },
                tooltip: {
                    shared: true,
                },
                series: myData
            });
        } else if (data_bubble !== null) {

            let myData = data_bubble.map(item => {
                let mySet = {};

                mySet.country = item.name_ua;
                mySet.name = item.alias;
                mySet.y = +item.area;
                mySet.x = +item.population_year_16;
                mySet.z = +item.budget_year_16;

                return mySet;

            });

            myData.sort((a,b) => b.z - a.z);

            chart = Highcharts.chart('item_chart', {
                lang: {
                    resetZoom: 'Назад'
                },
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
                    text: 'Співвідношення доходів, населення та площ територій, 2016р.'
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
                            style: cahrt_full ? {"fontSize": "15px"} : {"fontSize": "11px"}
                        }
                    }
                },

                series: [{
                    data: cahrt_full ? myData : myData.slice(0, 5)
                }]

            });
        }
    }

    componentDidMount() {
        // this.Chart()
    }

    componentDidUpdate() {
        this.Chart()
    }

    render() {
        const {cahrt_full, data_bubble} = this.props.map_reducer;
        return (
            <div className={cahrt_full ? 'chart_1 barChart_full' : 'chart_1'}>
                <div className="item_header">
                    <div className="map_heder_title">{data_bubble ? '' : 'Тренд'}</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content" id="item_chart"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);







