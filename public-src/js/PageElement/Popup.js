import React, {Component} from 'react';
import getFields from '../renderClaster/setFields';

export let year_labels = [];
export let dataToChart = [];
export let dataToChartUsd = [];

class Popup extends Component {

    getInfo() {
        const {feature, alias, feature_claster} = this.props;
        dataToChart = [];
        dataToChartUsd = [];
        year_labels = [];

        if (feature !== null) {

            let popupInfo = [];
            let i = 0;
            for (let key in feature) {
                if (feature.hasOwnProperty(key) && key.indexOf('year_') >= 0 && key.indexOf('usdyear') < 0) {
                    popupInfo.push(<p key={feature.id + i}>Станом на 20{key.substring(5)}р.
                        <span>{new Intl.NumberFormat().format(feature[key])} {feature.parameter}</span></p>)
                    year_labels.push(20 + key.substring(5) + 'р');
                    dataToChart.push(+feature[key]);
                    i++
                } else if(key.indexOf('usdyear') >= 0) {
                    dataToChartUsd.push(+feature[key])
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
                            <p>Населення (1.01.2017р.) <span>{new Intl.NumberFormat().format(feature.population)} осіб</span></p>
                            <p>Площа території <span>{new Intl.NumberFormat().format(feature.area)} га</span></p>
                        </div>
                        <div className="popup_bottom">
                            <h4>{ alias }</h4>
                            {popupInfo}
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
        const {feature, feature_claster} = this.props;
        return (feature !== null || feature_claster !== null) ? this.getInfo() : this.noInfo()
    }
}

export default Popup
