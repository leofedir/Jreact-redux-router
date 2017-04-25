import React, {Component} from 'react';

class Legend extends Component {
    createItem() {
        if (this.props.legend_data !== null) {
            const {limits, colors} = this.props.legend_data;
            const format = new Intl.NumberFormat().format;
            let dani = 'Дані відсутні';
            return (
                limits.map((item, i) => {
                    return (
                        <p key={ i }>
                            <i style={{background: colors[i]}}/>
                            {((limits[i] !== null) ?  'від ' + format(limits[i]) : dani) + ((i !== limits.length - 1 && limits[i + 1] !== null) ? ' до ' + format(limits[i + 1]) : (limits[i] !== null) ? '  +' : '')}
                        </p>
                    )
                })
            )
        }

        return null
    }

    render() {
        if (this.props.legend_data == null) return null;

        return (
            <div className="legend">
                <div className="item_header">
                    <div className="map_heder_title">Легенда</div>
                </div>
                <div className="item_content">
                    <div className="item_content" id="legend">
                        <h5 className="legend__title">Одиниці виміру: <span>{ this.props.legend_data != null ?  this.props.legend_data.parametr : ''}</span></h5>
                        {::this.createItem()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Legend



