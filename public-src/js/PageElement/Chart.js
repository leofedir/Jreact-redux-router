import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';

import {year_labels, dataToChart, dataToChartUsd} from './Popup'

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
        const {feature, alias, chart1, data_bubble, cahrt_full, dataChartUsd} = this.props.map_reducer;
        const format = new Intl.NumberFormat().format;

        if (feature != null) {

            let myData = [
                {
                    name: alias,
                    data: dataChartUsd ? dataToChartUsd : dataToChart
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
                        text: dataChartUsd ? 'долар' : feature.parameter
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
        }


        // else if (data_bubble !== null) {
        //
        //     let myData = data_bubble.map(item => {
        //         let mySet = {};
        //
        //         mySet.country = item.name_ua;
        //         mySet.name = item.alias;
        //         mySet.y = +item.area;
        //         mySet.x = +item.population_year_16;
        //         mySet.z = +item.budget_year_16;
        //
        //         return mySet;
        //
        //     });
        //
        //     myData.sort((a,b) => b.z - a.z);
        //
        //     chart = Highcharts.chart('item_chart', {
        //         lang: {
        //             resetZoom: 'Назад'
        //         },
        //         chart: {
        //             type: 'bubble',
        //             plotBorderWidth: 1,
        //             zoomType: 'xy'
        //         },
        //
        //         credits: {
        //             text: 'Енциклопедія територій',
        //             href: 'http://enter.co.ua',
        //             enabled: false
        //         },
        //         legend: {
        //             enabled: false
        //         },
        //
        //         title: {
        //             text: 'Доходи місцевих бюджетів, населення та площа територій, 2016 р.'
        //         },
        //         xAxis: {
        //             gridLineWidth: 1,
        //             title: {
        //                 text: 'Населення, осіб'
        //             }
        //         },
        //
        //         yAxis: {
        //             startOnTick: false,
        //             endOnTick: false,
        //             title: {
        //                 text: 'Площа, га'
        //             },
        //             maxPadding: 0.2
        //         },
        //
        //         tooltip: {
        //             useHTML: true,
        //             headerFormat: '<table>',
        //             pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        //             '<tr><th>Населення:</th><td>{point.x} осіб</td></tr>' +
        //             '<tr><th>Площа:</th><td>{point.y} га</td></tr>' +
        //             '<tr><th>Доходи:</th><td>{point.z} грн.</td></tr>',
        //             footerFormat: '</table>',
        //             followPointer: true
        //         },
        //
        //         plotOptions: {
        //             series: {
        //                 dataLabels: {
        //                     enabled: true,
        //                     format: '{point.name}',
        //                     style: cahrt_full ? {"fontSize": "15px"} : {"fontSize": "11px"}
        //                 }
        //             }
        //         },
        //
        //         series: [{
        //             data: cahrt_full ? myData : myData.slice(0, 5)
        //         }]
        //
        //     });
        // }
    }

    componentDidMount() {
        // this.Chart()
    }

    componentDidUpdate() {
        this.Chart()
    }

    toggleChartData(e) {
        let status = +e.target.dataset.usd;
        this.props.MapActions.toggle_curency(!!status)
    }

    render() {
        const {cahrt_full, data_bubble, dataChartUsd, feature, claster, curentMap, chart1, chart2} = this.props.map_reducer;
        const showToggle = dataToChartUsd.length > 0;
        return (
            <div className={cahrt_full ? 'chart_1 barChart_full' : 'chart_1'}>
                <div className="item_header">
                    <div className="map_heder_title">{data_bubble ? '' : 'Тренд'}</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content">
                    <div className="noData" style={!!feature || !!claster || curentMap === null? {display: 'none'} : {display: 'flex'}}>
                        <p>
                            Оберіть територію на мапі
                        </p>
                    </div>
                    <div className="region_toggle" style={!showToggle || claster ? {display: 'none'} : {display: 'block'}} >
                        <div className="region_toggle_item">
                            <p data-usd ='0' className={ dataChartUsd ? 'toggle' : 'toggle active'} onClick={ ::this.toggleChartData }>UAH</p>
                            <p data-usd ='1' className={ !dataChartUsd ? 'toggle' : 'toggle active'} onClick={ ::this.toggleChartData }>USD</p>
                        </div>
                    </div>
                    <div className="region_toggle" style={chart2 === null ? {display: 'none'} : {display: 'block'}} >
                        <div className="region_toggle_item">
                            <p data-usd ='0' className={ dataChartUsd ? 'toggle' : 'toggle active'} onClick={ ::this.toggleChartData }>Загальні</p>
                            <p data-usd ='1' className={ !dataChartUsd ? 'toggle' : 'toggle active'} onClick={ ::this.toggleChartData }>На 1 учня</p>
                        </div>
                    </div>
                    <div id="item_chart"/>
                </div>
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







