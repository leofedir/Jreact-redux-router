import React, { Component } from 'react';
import { alias } from '../aliasMapName'

class SubMenu extends Component {
    getMap(e) {
        let mapName = e.target.value;
        mapName.indexOf('area') == 0 ? this.props.get_map_area(mapName) : console.log('mapName >>', mapName)
    }

    getItem(){
        const items = this.props.fields.map((item, i) => {
            return <option  className="menu__item" key={i} value={item}>
                {alias[item] ? alias[item] : item}
            </option>
        });
        return (
            <select className="test" onChange={::this.getMap}>
                <option />
                {items}
            </select>
        )
    }

    render() {
        return (
            <div className="map_heder_title">
                {this.props.fields ? this.getItem() : ''}
            </div>
        )
    }
}


export default SubMenu;