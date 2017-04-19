import React, { Component } from 'react';
import { alias } from '../aliasMapName';

class SubMenu extends Component {
    getMap(e) {
        let mapName = e.target.value;
        let arr = this.props.fields[mapName]
        console.log('this.props >>', this.props)
        const { get_map_area } = this.props;

        if (arr.some(item => item == '__region')) {
            mapName.indexOf('area') == 0 ? get_map_area(mapName + '__region', alias[mapName]) : console.log('mapName >>', mapName)
        } else if (arr.some(item => item == '__district')) {
            mapName.indexOf('area') == 0 ? get_map_area(mapName + '__district', alias[mapName]) : console.log('mapName >>', mapName)
        }
    }

    getItem(){
        const arr = Object.keys(this.props.fields)
        const items = arr.map((item, i) => {
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