import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {checkStatus, parseJSON} from './checkJSON';

import Map from './PageElement/Map';
import Menu from './PageElement/Menu';
import ButtonMenu from './PageElement/buttonMenu';
import Popup from './PageElement/Popup';
import Chart from './PageElement/Chart';
import * as Actions from './actions/actions';
import * as MapActions from './actions/get_map_area';

let wrapper = document.getElementById('wrapper')


class App extends Component {

    full() {

    }

    displayTabs() {
        const tabs = this.state.tabs.map((t, i) => {
            return <li key={i} className={this.state.tab == i ? 'select' : ''} onClick={this.switchTabs.bind(this, i)}>
                <a >{t.label}</a></li>
        });
        return (
            <ul className="tab-nav">
                {tabs}
            </ul>
        )
    }

    render() {
        // console.log('this.props >>', this.props)
        const {category, fields, showMenu, mapFull, fetching} = this.props.main;
        const {fetching_map, curentMap, info, feature, alias} = this.props.map_reducer
        const {toggleMenu, resizeMap, get_submenu} = this.props.Actions;
        const {get_map_area} = this.props.MapActions;

        return (
            <div id="wrapper" className={ (showMenu ? '' : 'hide' ) + (mapFull ? ' mapFull' : '')}>
                <div className="heder">
                    <ButtonMenu toggleMenu={ toggleMenu } showMenu={ showMenu }/>
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="main__map">
                            <Map
                                category={category}
                                fields={fields}
                                resizeMap={ resizeMap }
                                mapFull={ mapFull }
                                fetching={ fetching }
                                fetching_map={ fetching_map }
                                curentMap={ curentMap }
                                alias={ alias }
                                get_map_area={ get_map_area }
                            />
                        </div>
                        <div className="main__right">

                            <div className="slider" id="slider"/>

                            <Popup feature={ feature } alias={ alias }/>

                            <div className="info">
                                <div className="item_header">
                                    <div className="map_heder_title">Довідка</div>
                                </div>
                                <div className="item_content">
                                    <div id="info"
                                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: 'Україна - держава у Східній Європі. Столиця - м.Київ. Площа - 60357712 га. Населення - 44933290 особи'}}/>
                                </div>
                            </div>

                            <div className="legend">
                                <div className="item_header">
                                    <div className="map_heder_title">Легенда</div>
                                </div>
                                <div className="item_content">
                                    <div className="item_content" id="legend"/>
                                </div>
                            </div>
                        </div>
                        <div className="main__chart">

                            <Chart feature={ feature } alias={ alias }/>

                            <div className="chart_2">
                                <div className="item_header">
                                    <div className="map_heder_title">Аналітика2</div>
                                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                       onClick={::this.full}/></div>
                                <div className="item_content">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="aside aside-1">
                        <Menu get_submenu={ get_submenu }/>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch),
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
