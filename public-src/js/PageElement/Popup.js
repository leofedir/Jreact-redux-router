import React, {Component} from 'react';
export let year_labels = [];
export let dataToChart = []

class Popup extends Component {

    getInfo(feature, alias) {
        dataToChart = [];
        year_labels = [];
        let popupInfo = [];
        let i = 0;
        for (let key in feature) {
            if (feature.hasOwnProperty(key) && key.indexOf('year_') >= 0) {
                popupInfo.push(<p key={feature.id + i}>Станом на 20{key.substring(5)}р. <span>{new Intl.NumberFormat().format(feature[key])} {feature.parameter}</span></p>)
                year_labels.push(20 + key.substring(5) + 'р');
                dataToChart.push(+feature[key]);
                i++
            }

        }
        return (
            <div className="description">
                <div className="item_header">
                    <div className="map_heder_title">{feature.name_ua}</div>
                </div>
                <div className="item_content">
                    <div className="popup_top">
                        <p>Код КОАТУУ <span>{feature.koatuu}</span></p>
                        <p>Населення <span>{feature.population} осіб</span></p>
                        <p>Площа території <span>{feature.area} га</span></p>
                    </div>
                    <div className="popup_bottom">
                        <h4>{ alias }</h4>
                        {popupInfo}
                    </div>
                </div>
            </div>
        )
    }

    noInfo() {
        dataToChart = [];
        year_labels = [];
        return null
    }

    render() {
        const {feature, alias} = this.props
        return feature != null ? this.getInfo(feature, alias) : this.noInfo()
    }
}

export default Popup
