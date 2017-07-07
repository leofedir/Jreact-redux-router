import React, {PureComponent} from 'react';
import getFields from '../renderClaster/setFields';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {toggle_Popup_Fullsize} from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';

export let year_labels = [];
export let dataToChart = [];
export let dataToChartUsd = [];

let curency = null;

export let curentCurency = null;

class Popup extends PureComponent {
    setDataFromFeature() {
        const {curencyIndexCurency} = this.props.map_reducer;
        const {popup_fullsize} = this.props.main
        curency !== null ? curentCurency = curency[curencyIndexCurency] : curentCurency = "";
        const {feature} = this.props.map_reducer;
        let popupInfo = [];

        let objetKeys = Object.keys(feature).filter(item => item.indexOf(curentCurency + 'year_') >= 0).sort();
        objetKeys.forEach((item, i) => {
            popupInfo.push(<p key={feature.id + i}>Станом на 20{item.substring(item.lastIndexOf('_') + 1)} р.
                <span>{new Intl.NumberFormat().format(feature[item])}</span></p>)
            year_labels.push(20 + item.substring(item.lastIndexOf('_') + 1) + 'р');
            dataToChart.push(+feature[item]);
        })
        //popup if > 4
        popupInfo.reverse();
        const shortPopup = popupInfo.slice(0, 4);

        // for (let key in feature) {
        //     if (feature.hasOwnProperty(key) && key.indexOf(curentCurency + 'year_') >= 0) {
        //         console.log('key >>', key)
        //         popupInfo.push(<p key={feature.id + i}>Станом на 20{key.substring(key.lastIndexOf('_') + 1)} р.
        //             <span>{new Intl.NumberFormat().format(feature[key])}</span></p>)
        //         year_labels.push(20 + key.substring(key.lastIndexOf('_') + 1) + 'р');
        //         dataToChart.push(+feature[key]);
        //         i++
        //     }
        // }

        return popup_fullsize ? <div className="popup-bottom-wrapper">{popupInfo}</div> :
            <div className="popup-bottom-wrapper">{shortPopup}</div>
    }

    toggleFullSize = () => {
        const {toggle_Popup_Fullsize} = this.props.Actions;
        const {popup_fullsize} = this.props.main;

        toggle_Popup_Fullsize(!popup_fullsize)
    }

    buttonFullSize = () => {
        const {popup_fullsize} = this.props.main;
        // return popup_fullsize ? <i aria-hidden='true' className='fa fa-angle-up popup-toggle-button popup-down fa-2x'
        //                            onClick={this.toggleFullSize}/> :
        //                         <i aria-hidden='true' className='fa fa-angle-down popup-toggle-button popup-down fa-2x'
        //                            onClick={this.toggleFullSize}/>

        return (
            <div className="arrow-container" onClick={this.toggleFullSize}>
                <button data-am-linearrow="tooltip tooltip-bottom" value="Show Utilities">
                    <div className={popup_fullsize ? `line line-1 up-arrow-left` : `line line-1`}></div>
                    <div className={popup_fullsize ? `line line-2 up-arrow-right` : `line line-2`}></div>
                </button>
            </div>
        )
    }

    setCurentCurency(e) {
        console.log('setCurentCurency')
        const {setCurency} = this.props.MapActions;
        let obj = {
            index: e.target.value,
            val: curency[e.target.value].toUpperCase()
        };
        setCurency(obj)
    }

    getCyrencyItems() {
        const {curencyIndexCurency} = this.props.map_reducer;
        console.log('curency select ->')
        return (
            <select className="curency_select" value={curencyIndexCurency} onChange={::this.setCurentCurency}>
                {curency.map((item, i) => {
                    return <option className="" key={i} value={i}>
                        {item.toUpperCase()}
                    </option>
                })}
            </select>
        )
    }

    getInfo() {
        const {feature, alias, feature_claster} = this.props.map_reducer;
        const {popup_fullsize} = this.props.main
        dataToChart = [];
        dataToChartUsd = [];
        year_labels = [];
        let popupItemCount = 0;

        if (feature !== null) {

            if (feature.parameter2) {
                curency = feature.parameter2.toLowerCase().split(',');
                curentCurency = curency[0]
            } else {
                curency = null;
                curentCurency = null;
            }

            let tempObj = {...feature};

            let objFeature = Object.keys(tempObj).filter(item => item.indexOf('year_') >= 0);
            return (
                <div className="description">
                    <div className="item_header">
                        <div className="map_heder_title">{feature.name_ua}</div>
                    </div>
                    <div className="item_content">
                        <div className="popup_top">
                            <p>Код КОАТУУ <span>{feature.koatuu}</span></p>
                            <p>Населення (01.01.2017р.) <span>{new Intl.NumberFormat().format(feature.population)}
                                осіб</span></p>
                            <p>Площа території <span>{new Intl.NumberFormat().format(feature.area)} га</span></p>
                        </div>
                        <div
                            className={objFeature.length > 4 && popup_fullsize ? "popup_bottom popup_bottom-active" : "popup_bottom"}>
                            <div className="popup_buttom-top">
                                <div className="popup_buttom-title">
                                    <h4>{ alias }</h4>
                                </div>
                                <div className="curency">
                                    {curency !== null ? this.getCyrencyItems() : <p>{ feature.parameter}</p>}
                                </div>
                            </div>
                            {::this.setDataFromFeature(popupItemCount)}
                            {objFeature.length > 4 ? this.buttonFullSize() : ''}
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
        MapActions: bindActionCreators(MapActions, dispatch),
        Actions: bindActionCreators({toggle_Popup_Fullsize}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

