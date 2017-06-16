import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';
import {choroplethLayer} from '../getMapArea'
import {LightenDarkenColor, rgbToHex} from '../utils/colors'
import {alias} from '../aliasMapName';

export let refsThis;

class Legend extends Component {
    constructor() {
        super()
        
        refsThis = this
    }
    handleChange(e) {
        const {check} = this.props.map_reducer;
        const {toggle_layer, toggle_check} = this.props.MapActions;
        let id = e.currentTarget.id;
        check[id] = !check[id];
        toggle_check(check);
        toggle_layer(id, check[id]);
        return null;
    }

    handleChangeAll(e) {
        const {checkAll, check} = this.props.map_reducer;
        const {check_all} = this.props.MapActions;
        check_all(checkAll, check)
    }
    handleOnHover = (e) => {
        const color = rgbToHex(e.target.style.backgroundColor);
    
        //search and modificate layer
        Object.values(choroplethLayer._layers).map((layer) => {
            if (layer.options.fillColor === color) {
                layer.setStyle({
                    weight: 1.7, // border of region or district
                    fillColor: LightenDarkenColor(color, +60), // + light | - dark
                    color: 'red'
                })
                console.log(layer)
            }
        })
    }
    
    handleOnUnhover = () => {
        Object.values(choroplethLayer._layers).map((layer) => {
            choroplethLayer.resetStyle(layer);
        })
    }
    
    handleHoverMapLegend = (hc, c) => {
        return hc === c
    }

    createItem() {
        const {check, clasterCount, checkAll, hoverColor, curency} = this.props.map_reducer;
        const {legend_data, claster_layers,} = this.props.main;
        const format = new Intl.NumberFormat().format;
        if (legend_data !== null) {
            const {limits, colors} = legend_data;
            let dani = 'Дані відсутні';
            const valueCur = curency === '' ? legend_data.parametr : curency
            return (
                <div className="item_content" id="legend">
                    <h5 className="legend__title">Одиниці виміру:
                        <span> { legend_data != null ? valueCur : ''}</span>
                    </h5>
                    {limits.map((item, i) => {
                        return (
                            <p key={ i } ref={legend_data.refs[i]}>
                                <i className={this.handleHoverMapLegend(hoverColor, colors[i]) ? 'legend-active' : ''} onMouseMove={this.handleOnHover}  onMouseOut={this.handleOnUnhover} style={{backgroundColor: colors[i]}}/>
                                {((limits[i] !== null) ? ' ' + format(limits[i]) : dani) + ((i !== limits.length - 1 && limits[i + 1] !== null) ? ' < ' + format(limits[i + 1]) : (limits[i] !== null) ? '  <' : '')}
                            </p>
                        )
                    })}
                </div>
            )
        } else if (claster_layers !== null) {
            return (
                <div className="item_content" id="list_layers">
                    <p onClick={::this.handleChangeAll}>
                        <i className={!checkAll ? 'fa fa-eye-slash' : "fa fa-eye" } aria-hidden="true"/>
                        <span className="icon"/>
                        <span className="text">Обрати всі </span>
                        <span className="count">{ `  (${ format(clasterCount) })` }</span>
                    </p>
                    {claster_layers.map((item, i) => {
                            return (
                                <p key={ i }
                                   onClick={::this.handleChange}
                                   id={i}>
                                    <i className={ !check[i] ? 'fa-2x fa fa-eye-slash' : "fa-2x fa fa-eye" } aria-hidden="true"/>
                                    <span>
                                    <span className="icon"/>
                                    <span
                                        className="text">{ alias[item[1].name] ? alias[item[1].name] : item[1].name }</span>
                                    <span className="count">{ `  (${ format(item[1]['count']) })` }</span>
                                    </span>
                                </p>
                            )
                        }
                    )}
                </div>
            )
        }
        return null
    }

    render() {
        const {legend_data, claster_layers} = this.props.main;
        if (legend_data === null && claster_layers === null) return null;

        return (
            <div className="legend">
                <div className="item_header">
                    <div className="map_heder_title">{legend_data ? 'Легенда' : 'Об`єкти'}</div>
                </div>
                <div className="item_content">
                    {::this.createItem()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch),
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legend);



