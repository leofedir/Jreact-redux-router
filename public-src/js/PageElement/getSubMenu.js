import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';

import { alias } from '../aliasMapName';

class SubMenu extends Component {
    getMap(e) {
        let mapName = e.target.value;
        let arr = this.props.main.fields[mapName];
        const { get_map_area, getMapData } = this.props.MapActions;

        let tableData = arr.map(item => mapName + item);

        getMapData(tableData, arr)

        if (arr.some(item => item == '__region')) {
            mapName.indexOf('area') == 0 ? get_map_area(mapName + '__region', true, alias[mapName]) : console.log('mapName >>', alias[mapName])
        } else if (arr.some(item => item == '__district')) {
            mapName.indexOf('area') == 0 ? get_map_area(mapName + '__district', true, alias[mapName]) : console.log('mapName >>', alias[mapName])
        }
    }

    getItem(){
        const arr = Object.keys(this.props.main.fields)
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
                {this.props.main.fields ? this.getItem() : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        map_reducer: state.map_reducer,
        main: state.main
    }
}

function mapDispatchToProps(dispatch) {
    return {
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);