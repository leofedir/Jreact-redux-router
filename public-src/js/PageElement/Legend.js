import React, {Component} from 'react';
import {alias} from '../aliasMapName';

class Legend extends Component {

    handleChange(e) {
        console.log('e.target. >>', e.target)
        const { check, toggle_layer, toggle_check } = this.props
        let id = e.target.id;
        let checked = e.target.checked ? 'show' : 'hide';
        toggle_layer(id, checked);
        check[id] = !check[id];
        toggle_check(check);
        return null;
    }

    handleChangeAll(e) {
        console.log('e.target.checked >>', e.target.checked)
        const { check, toggle_layer, toggle_check } = this.props;
        let checked = e.target.checked ? 'show' : 'hide';
        let myCheck = check.map((item, i) => {
            toggle_layer(i, checked);
            return e.target.checked
        });
        toggle_check(myCheck);
    }

    createItem() {
        const {legend_data, claster_layers, check, clasterCount} = this.props;
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
                    <p>
                        <label>
                            <input
                                type="checkbox"
                                value='all'
                                defaultChecked={false}
                                onChange={::this.handleChangeAll}
                                className="checkbox"/>
                            <span className="icon"/>
                            <span className="text">Обрати все</span>
                            <span className="count">{ `  (${ format(clasterCount) })` }</span>
                        </label>
                    </p>
                    {claster_layers.map((item, i) => {
                            return (
                                <p key={ i }>
                                    <label>
                                        <input
                                            id={i}
                                            type="checkbox"
                                            defaultChecked={ check[i] }
                                            onChange={::this.handleChange}
                                            className="checkbox"/>
                                        <span className="icon"/>
                                        <span className="text">{ alias[item[1].name] ? alias[item[1].name] : item[1].name }</span>
                                        <span className="count">{ `  (${ format(item[1]['count']) })` }</span>
                                    </label>
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



