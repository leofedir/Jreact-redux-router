import React, {Component} from 'react';
import {alias} from '../aliasMapName';
import Toggle from 'react-toggle';
// import claster from '../renderClaster/claster'

class Legend extends Component {

    handleEggsChange(e) {
        let toggle_layer = this.props.toggle_layer;
        let layer = e.target.dataset.layer;
        let checked = e.target.checked;
        toggle_layer(layer, checked)
    }

    createItem() {
        const {legend_data, claster_layers, toggle_layer} = this.props;


        if (legend_data !== null) {
            const {limits, colors} = legend_data;
            const format = new Intl.NumberFormat().format;
            let dani = 'Дані відсутні';
            return (
                <div className="item_content" id="legend">
                    <h5 className="legend__title">Одиниці виміру:
                        <span>{ legend_data != null ? legend_data.parametr : ''}</span></h5>
                    {limits.map((item, i) => {
                        return (
                            <p key={ i }>
                                <i style={{background: colors[i]}}/>
                                {((limits[i] !== null) ? 'від ' + format(limits[i]) : dani) + ((i !== limits.length - 1 && limits[i + 1] !== null) ? ' до ' + format(limits[i + 1]) : (limits[i] !== null) ? '  +' : '')}
                            </p>
                        )
                    })}
                </div>

            )
        } else if (claster_layers !== null) {
            return (
                <div className="item_content" id="list_layers">

                    {claster_layers.map((item, i) =>
                        <div key={ i }>
                            <Toggle
                                defaultChecked={false}
                                data-layer={ item }
                                onChange={::this.handleEggsChange} />
                            <span>{ alias[item] ? alias[item] : item  }</span>
                            {/*<label>*/}
                                {/*<input type="checkbox" value="'+ layer.id +'" className="checkbox"/>*/}
                                {/*<span className="icon"/>*/}
                                {/*<span className="text">{ alias[item] ? alias[item] : item  }</span>*/}
                            {/*</label>*/}
                        </div>
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


