import React, {Component} from 'react';

class ButtonMenu extends Component {


    rtr() {
        fieldNames.items.forEach(item => {
            popupInfo.push("<p>" + item.name + "<span>${" + item.value + "} ${parameter}</span></p>")
        })

        let infoWindow = new InfoWindowLite(null, domConstruct.create("div", null, null, map.root));
        infoWindow.startup();
        map.setInfoWindow(infoWindow);

        let infoTemplate = new InfoTemplate();
        infoTemplate.setTitle("${name_ua}");
        infoTemplate.setContent(
            "<div class='popup_top'><p>Код КОАТУУ <span>${koatuu}</span></p><p>Населення <span>${population} осіб</span></p></div>" +
            "<div class='popup_bottom'><h4>" + item.name + "</h4>" + popupInfo.join('') + "</div>" +
            '<div id="simplechart"></div>'
        );
    }

    getInfo(feature, alias) {
        let popupInfo = []

        for (let key in feature) {
            if (feature.hasOwnProperty(key) && key.indexOf('year_')) {

            }
        }

        // feature.forEach(item => {
        //     popupInfo.push("<p>"+item.name +"<span>${"+ item.value +"} ${parameter}</span></p>")
        // })
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
                        <p>Код КОАТУУ <span>{feature.koatuu}</span></p>
                        <p>Населення <span>{feature.population} осіб</span></p>
                        <p>Площа території <span>{feature.area} га</span></p>
                    </div>
                </div>
            </div>

            // {items}
        )
    }

    render() {
        const {feature, alias} = this.props
        console.log('this.props >>', this.props)
        console.log('feature >>', feature)
        return feature != null ? this.getInfo(feature, alias) : null
    }
}

export default ButtonMenu









