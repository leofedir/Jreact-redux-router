import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MapActions from '../REDUX/actions/get_map_area';
import * as Actions from '../REDUX/actions/actions';

import {alias} from '../aliasMapName';

let itemMenu = null;

class SubMenu extends PureComponent {
    getMap(e, firstMap) {
        let mapName = e !== null ? e.target.value : firstMap;
        let arr = this.props.main.fields[mapName];
        console.log('arr >>', arr)
        const {claster} = this.props.map_reducer;
        const {range_item, range_items} = this.props.main;
        
        const {getMapData, show_claster, set_data_bubble} = this.props.MapActions;
        const {set_submenu_item, toggle_Popup_Fullsize} = this.props.Actions;
        
        if (this.props.main.range_items) {
            toggle_Popup_Fullsize(false);
        }
        set_submenu_item(mapName, arr);

        if (mapName == 'area_budgets_dohodymistsevogobudget') {
            set_data_bubble(range_items[range_item])
        }

        let tableData = arr.map(item => mapName + item);
        // mapName.startsWith('area') && tableData.length > 1 ? getMapData(tableData, arr, mapName + '__district', true, alias[mapName], false) : '';
        if (arr.some(item => item == '__region')) {
            getMapData(tableData, arr, mapName + '__region', true, alias[mapName], true)
        }
        else if (arr.some(item => item == '__district')) {
            getMapData(tableData, arr, mapName + '__district', true, alias[mapName], false)
        }
        else if (arr.some(item => item == "__otg")) {
            getMapData(tableData, arr, mapName + "__otg", true, alias[mapName], false)
        }
        else if (arr.some(item => item == "__settelments")) {
            getMapData(tableData, arr, mapName + "__settelments", true, alias[mapName], false)
        }
        else if (!mapName.startsWith('area')) {
            show_claster(claster, mapName)
        }
    }

    getItem() {
        return (
            <select value={ this.props.main.submenu_item } className="test" onChange={::this.getMap}>
                {Object.keys(this.props.main.fields).sort().map((item, i) => {
                    i === 0 ? itemMenu = item : '';
                    if (!alias[item]) return // skip option if don't have ukrainian alias
                    return <option className="menu__item" key={i} value={item}>
                        {alias[item] ? alias[item] : item}
                    </option>
                })}
            </select>
        )
    }

    componentDidUpdate() {
        const {submenu_item} = this.props.main;

        if (submenu_item == '' && itemMenu !== null) {
            this.getMap(null, itemMenu)
        }

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