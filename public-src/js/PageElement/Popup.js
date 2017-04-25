import React, {Component} from 'react';
export let year_labels = [];
export let dataToChart = []

class Popup extends Component {

    getInfo() {
        const {feature, alias, feature_claster} = this.props;
        console.log('this.props >>', this.props)

        if (feature != null) {
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
                            <p>Населення <span>{new Intl.NumberFormat().format(feature.population)} осіб</span></p>
                            <p>Площа території <span>{new Intl.NumberFormat().format(feature.area)} га</span></p>
                        </div>
                        <div className="popup_bottom">
                            <h4>{ alias }</h4>
                            {popupInfo}
                        </div>
                    </div>
                </div>
            )
        } else if (feature_claster != null) {

            let popapItems = [`<div class="popup_header"><button class="closeButton" onclick="document.getElementById('props').style.display = 'none'"></button></div>`];
            popup.style.display = 'block';

            fields.forEach(item => {

                if (item.title === 'Назва') {
                    popapItems.push(`<h5 className="name">${ e.layer.feature.properties[item.key] }</h5>`)
                } else if (e.layer.feature.properties[item.key]) {
                    popapItems.push(`<div class="popup_item"><img src="${ item.img }"><p>${ e.layer.feature.properties[item.key] }</p></div> `)
                }
            })

            let data = e.layer.feature.properties;

            for (let key in data) {
                if (data.hasOwnProperty(key) && ~key.indexOf('_') && key.slice(0, key.indexOf('_')) == 'chart') {
                    addChart();
                    return
                }

            }
            ;

            popup.innerHTML = popapItems.join('')

            addEventClose()

            function addChart() {

                popapItems.push(`<div class="wrapp_chart"><div id="chart_point" className="chart"></div></div>`)
                let dataChart = [];

                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let str = key.slice(0, key.indexOf('_'))
                        if (str == 'chart') {
                            str = (key.slice(key.indexOf('_') + 1, key.indexOf('_', key.indexOf('_') + 1)))
                            let obj = {};
                            obj.name = str;
                            // obj.date = `${new Date(key.slice(key.lastIndexOf('_') + 1)).getTime()}`;
                            // obj.date = `${key.slice(key.lastIndexOf('_') + 1)}`;
                            obj.data = data[key];
                            dataChart.push(obj)
                        }
                    }
                }
                popup.innerHTML = popapItems.join('')
                Chart(dataChart)
                addEventClose()
            }

        }


    }

    noInfo() {
        dataToChart = [];
        year_labels = [];
        return null
    }

    render() {
        const {feature, feature_claster} = this.props;
        console.log('this.props >>', this.props)
        return (feature != null || feature_claster != null) ? this.getInfo() : this.noInfo()
    }
}

export default Popup
