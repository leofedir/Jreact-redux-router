import React, {Component} from 'react';
import {alias} from '../aliasMapName';

class Legend extends Component {

    handleChange(e) {
        const {check, toggle_layer, toggle_check} = this.props;
        let id = e.currentTarget.id;
        check[id] = !check[id];
        toggle_check(check);
        toggle_layer(id, check[id]);
        return null;
    }

    handleChangeAll(e) {
        const {check_all, checkAll, check} = this.props;
        check_all(checkAll, check)
    }

    createItem() {
        const {legend_data, claster_layers, check, clasterCount, checkAll, toggle_check, toggle_layer} = this.props;
        const format = new Intl.NumberFormat().format;

        if (legend_data !== null) {
            const {limits, colors} = legend_data;

            let dani = 'Дані відсутні';
            return (
                <div className="item_content" id="legend">
                    <h5 className="legend__title">Одиниці виміру:
                        <span>{ legend_data != null ? legend_data.parametr : ''}</span></h5>
                    {limits.map((item, i) => {
                        return (
                            <p key={ i }>
                                <i style={{background: colors[i]}}/>
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
                        <span className="text">Обрати все </span>
                        <span className="count">{ `  (${ format(clasterCount) })` }</span>
                    </p>
                    {claster_layers.map((item, i) => {
                        if (i === 0 && !check[i]) {
                            check[i] = !check[i];
                            toggle_check(check);
                            toggle_layer(i, check[i]);
                        }
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
        const {legend_data, claster_layers} = this.props;
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

export default Legend



