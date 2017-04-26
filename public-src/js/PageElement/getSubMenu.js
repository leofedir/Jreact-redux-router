import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';

import { alias } from '../aliasMapName';

class SubMenu extends Component {
    getMap(e) {
        let mapName = e.target.value;
        let arr = this.props.main.fields[mapName];
        const { range_item } = this.props.main;
        const { claster } = this.props.map_reducer;
        const { get_map_area, getMapData, show_claster } = this.props.MapActions;
        const { set_submenu_item } = this.props.Actions;

        set_submenu_item(mapName);

        let tableData = arr.map(item => mapName + item);

        console.log('mapName >>', mapName)
        console.log('mapName. >>', mapName.indexOf('area'))

        mapName.indexOf('area') === 0 ? getMapData(tableData, arr) : '';

        if (arr.some(item => item === '__region')) {
            get_map_area(mapName + '__region', true, alias[mapName], range_item)
        } else if (arr.some(item => item === '__district')) {
           get_map_area(mapName + '__district', true, alias[mapName], range_item)
        } else if ( mapName.indexOf('area') < 0) {
            show_claster(claster, mapName)
        }
    }

    getItem(){
        return (
            <select value={ this.props.main.submenu_item } className="test" onChange={::this.getMap}>
                <option value=""/>
                {Object.keys(this.props.main.fields).map((item, i) => {
                    return <option  className="menu__item" key={i} value={item}>
                        {alias[item] ? alias[item] : item}
                    </option>
                })}
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
        MapActions: bindActionCreators(MapActions, dispatch),
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);