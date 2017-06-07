import React, {Component} from 'react';
import getFields from '../renderClaster/setFields';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MapActions from '../REDUX/actions/get_map_area';

export let year_labels = [];
export let dataToChart = [];
export let dataToChartUsd = [];

let curency = null;

export let curentCurency = null;

class Popup extends Component {

    setDataFromFeature() {
        const {curencyIndexCurency} = this.props.map_reducer;
        curency !== null ? curentCurency = curency[curencyIndexCurency] : curentCurency = "";
        const {feature} = this.props.map_reducer;
        let popupInfo = [];
        let i = 0;
        for (let key in feature) {
            if (feature.hasOwnProperty(key) && key.indexOf(curentCurency + 'year_') >= 0) {
                popupInfo.push(<p key={feature.id + i}>Станом на 20{key.substring(key.lastIndexOf('_') + 1)} р.
                    <span>{new Intl.NumberFormat().format(feature[key])}</span></p>)
                year_labels.push(20 + key.substring(key.lastIndexOf('_')) + 'р');
                dataToChart.push(+feature[key]);
                i++
            }
        }
        return popupInfo
    }

    setCurentCurency(e) {
        const {setCurency} = this.props.MapActions;
        let obj = {
            index: e.target.value,
            val: curency[e.target.value]
        }
        setCurency(obj)
    }

    getCyrencyItems() {
        const {curencyIndexCurency} = this.props.map_reducer
        return (
            <select className="curency_select" value={curencyIndexCurency} onChange={::this.setCurentCurency}>
                {curency.map((item, i) => {
                    return <option  className="" key={i} value={i}>
                        {item.toUpperCase()}
                    </option>
                })}
            </select>
        )
    }

    getInfo() {
        const {feature, alias, feature_claster} = this.props.map_reducer;
        dataToChart = [];
        dataToChartUsd = [];
        year_labels = [];

        if (feature !== null) {

            if (feature.parameter2) {
                curency = feature.parameter2.toLowerCase().split(',');
                curentCurency = curency[0]
            } else {
                curency = null;
                curentCurency = null;
            }
            return (
                <div className="description">
                    <div className="item_header">
                        <div className="map_heder_title">{feature.name_ua}</div>
                    </div>
                    <div className="item_content">
                        <div className="popup_top">
                            <p>Код КОАТУУ <span>{feature.koatuu}</span></p>
                            <p>Населення (01.01.2017р.) <span>{new Intl.NumberFormat().format(feature.population)} осіб</span></p>
                            <p>Площа території <span>{new Intl.NumberFormat().format(feature.area)} га</span></p>
                        </div>
                        <div className="popup_bottom">
                            <div className="popup_buttom-top">
                                <div className="popup_buttom-title">
                                    <h4>{ alias }</h4>
                                </div>
                                <div className="curency">
                                    {curency !== null ? this.getCyrencyItems() : <p>{ feature.parameter}</p>}
                                </div>
                            </div>
                            {::this.setDataFromFeature()}
                        </div>
                    </div>
                </div>
            )
        } else if (feature_claster !== null) {

            let fields = getFields();

            let popapItems = [];

            fields.forEach((item, i) => {

                if (item.title === 'Назва') {
                    popapItems.push(<h5 key={feature_claster.object_id + (i + '')}
                                        className="name">{ feature_claster[item.key] }</h5>)
                } else if (feature_claster[item.key]) {
                    popapItems.push(<div key={feature_claster.object_id + (i + '')} className="popup_item"><i
                        className={ item.class }/><p>{ feature_claster[item.key] }</p></div>)
                }
            });

            return (
                <div className="description">
                    <div className="item_header">
                        <div className="map_heder_title"/>
                    </div>
                    <div className="item_content">
                        <div className="popup_top claster">
                            { popapItems }
                        </div>
                    </div>
                </div>
            )
        }
    }


    noInfo() {
        dataToChart = [];
        year_labels = [];
        return null
    }

    render() {
        const {feature, feature_claster} = this.props.map_reducer;
        dataToChartUsd = [];
        return (feature !== null || feature_claster !== null) ? this.getInfo() : this.noInfo()
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
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

