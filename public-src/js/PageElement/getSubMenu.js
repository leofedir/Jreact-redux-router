import React, { Component } from 'react';
import { alias } from '../aliasMapName'
import getMapArea from '../getMapArea'

class SubMenu extends Component {
    getMap(e) {
        getMapArea(e.target.value)
        console.log('terget',e.target.value)
    }

    getItem(){
        const items = this.props.fields.map((item, i) => {
            return <option  className="menu__item" key={i} value={item}>
                {alias[item] ? alias[item] : item}
            </option>
        });
        return (
            <select className="test" onChange={this.getMap}>
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