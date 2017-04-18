import React, { Component } from 'react';
import { alias } from '../aliasMapName'

class SubMenu extends Component {
    getMap(e) {
        let mapName = e.target.value;
        let arr = this.props.fields[mapName]
        function isPositive(item) {
            return number == '__region';
        }

        if (arr.some(item => item == '__region')) {
            mapName.indexOf('area') == 0 ? this.props.get_map_area(mapName + '__region') : console.log('mapName >>', mapName)
        }



        console.log('this.props.fields[mapName] >>',mapName + arr)

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