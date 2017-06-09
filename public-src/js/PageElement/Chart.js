import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';

import {year_labels, dataToChart, dataToChartUsd} from './Popup'

const Highcharts = require('highcharts');


let chart = null;

let tooltipParametr;

let alias_series = {
    budget: 'Бюджет закладу',
    zarplnarahuv: 'Заробітна плата з нарахуваннями',
    teplo: 'Видатки на теплопостачання',
    elektroenergy: 'Видатки на електропостачання',
    water: 'Видатки на водопостачання',
    inshivydatky: 'Інші видатки',
    vnesky: 'Батьківські внески',
    naodnohouchnya: 'Загальні видатки в розрахунку на одного учня',
    zarplnarahuvnaodnogo: 'Видатки на оплату праці в розрахунку на одного учня',
    tepolonaodnogo: 'Видатки на теплопостачання в розрахунку на одного учня',
    elektroenergynaodnogo: 'Видатки на електроенергію в розрахунку на одного учня',
    waternaodnogo: 'Видатки на водопостачання в розрахунку на одного учня'
};

class Chart extends Component {

    toggleChart() {
        this.props.MapActions.ChartToggle(this.props.map_reducer.chart_full);
    }

    toggleToStudent(e) {
        let status = +e.target.dataset.user;

        this.props.MapActions.toggleChartToStudent(!!status)

    }
    
    Chart() {
        const {feature, alias, chart1, chart2, dataChartUsd, for1Student, curency} = this.props.map_reducer;
        const format = new Intl.NumberFormat().format;


        if (feature != null) {
            tooltipParametr = curency != "" ? curency : feature.parameter

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
                    categories: year_labels
                },
                tooltip: {
                    shared: true,
                    hideDelay: 100,
                    valueSuffix: ' ' + tooltipParametr
                },
                series: myData
            });
        } else if (feature === null && chart !== null && chart1 === null) {
            chart.destroy();
            chart = null
        } else if (chart1 !== null) {
            tooltipParametr = 'UAH'
            let myData2 = [];
            let labels2 = [];

            if (chart2 !== null) {

                let i = 0;

                for (let key in chart2) {
                    if (chart2.hasOwnProperty(key)) {

                        let obj = {
                            name: alias_series[key] || key,
                            data: []
                        };

                        chart2[key].forEach(item => {
                            obj.data.push(item.value);
                            i === 0 ? labels2.push(`${ item.year }р`) : ''
                        });
                        i++;
                        myData2.push(obj)
                    }
                }
            }

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
                    text: for1Student ? 'Витрати  шкільного бюджету в розрахунку на одного учня' : 'Загальні витрати та доходи шкільного бюджету'
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
                    categories: for1Student ? labels2 : labels
                },
                tooltip: {
                    shared: true,
                    hideDelay: 100,
                    valueSuffix: ' ' + tooltipParametr
                },
                series: for1Student ? myData2 : myData
            });
        }
    }

    componentDidMount() {
        // this.Chart()
    }

    componentDidUpdate() {
        this.Chart()
    }

    onHeaderChartClick() {
        console.log('1111 >>', 1111)
        this.props.Actions.resizeMap(this.props.main.mapFull)
    }

    render() {
        const {chart_full, dataChartUsd, feature, claster, curentMap, for1Student, chart2, bubble_chart_full, bar_chart_full} = this.props.map_reducer;
        const showToggleUsd = dataToChartUsd.length > 0;
        const chartStyle = (bubble_chart_full || bar_chart_full) ? `disabled` : ``;
        
        return (
            <div className={chart_full ? `chart_1 barChart_full` : `chart_1 ${chartStyle}`}>
                <div className="item_header">
                    <div className="map_heder_title" onClick={::this.onHeaderChartClick}>Тренд</div>
                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover" onClick={ ::this.toggleChart }/>
                </div>
                <div className="item_content">
                    <div className="noData"
                         style={(feature !== null && !claster || curentMap === null) ? {display: 'none'} : {display: 'flex'}}>
                        <p>
                            Оберіть територію на мапі
                        </p>
                    </div>
                    <div className="region_toggle" style={chart2 === null ? {display: 'none'} : {display: 'block'}}>
                        <div className="region_toggle_item">
                            <p data-user='1' className={ for1Student ? 'toggle' : 'toggle active'}
                               onClick={ ::this.toggleToStudent }>Загальні</p>
                            <p data-user='0' className={ !for1Student ? 'toggle' : 'toggle active'}
                               onClick={ ::this.toggleToStudent }>На 1 учня</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);







