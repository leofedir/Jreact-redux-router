import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Map from './PageElement/Map';
import Menu from './PageElement/Menu';
import ButtonMenu from './PageElement/buttonMenu';
import Popup from './PageElement/Popup';
import Chart from './PageElement/Chart';
import BarChart from './PageElement/BarChart';
import SliderRange from './PageElement/sliderRange';
import Legend from './PageElement/Legend';
import Info from './PageElement/info';
import MapTitle from './PageElement/MapTitle';
import * as Actions from './REDUX/actions/actions';
import * as MapActions from './REDUX/actions/get_map_area';

let wrapper = document.getElementById('wrapper')


class App extends Component {

    // full() {
    //
    // }

    // displayTabs() {
    //     const tabs = this.state.tabs.map((t, i) => {
    //         return <li key={i} className={this.state.tab == i ? 'select' : ''} onClick={this.switchTabs.bind(this, i)}>
    //             <a >{t.label}</a></li>
    //     });
    //     return (
    //         <ul className="tab-nav">
    //             {tabs}
    //         </ul>
    //     )
    // }

    render() {
        // console.log('this.props >>', this.props)
        const {category, showMenu, mapFull, fetching, range_items, range_item, show_range, legend_data, claster_layers, title_map, fields, submenu_item} = this.props.main;
        const {fetching_map, curentMap, info, feature, alias, claster, feature_claster, isCheckAll, check, clasterCount, checkAll, dataChartRegion} = this.props.map_reducer;
        const {toggleMenu, resizeMap, get_submenu, set_Range_item} = this.props.Actions;
        const {get_map_area, toggle_layer, set_chart_data, toggle_check, check_all, toggle_data} = this.props.MapActions;

        return (
            <div id="wrapper" className={ (showMenu ? '' : 'hide' ) + (mapFull ? ' mapFull' : '')}>
                <div className="heder">

                    <a className="logo_link" href="/"/>
                    <ButtonMenu toggleMenu={ toggleMenu } showMenu={ showMenu }/>
                    <MapTitle title_map={ title_map }/>
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="main__map">
                            <Map
                                fetching={ fetching }
                                fetching_map={ fetching_map }
                                category={category}
                                resizeMap={ resizeMap }
                                mapFull={ mapFull }
                                get_map_area={ get_map_area  }
                                curentMap={ curentMap }
                                alias={ alias }
                                claster={ claster }
                                fields={ fields }
                                submenu_item={ submenu_item }
                            />
                        </div>
                        <div className="main__right">
                            <SliderRange range_items={ range_items} range_item={ range_item}
                                         set_Range_item={ set_Range_item } show_range={ show_range }/>
                            <Popup feature={ feature } alias={ alias } feature_claster={ feature_claster } set_chart_data={ set_chart_data } />
                            <Legend
                                legend_data={ legend_data }
                                claster_layers={ claster_layers }
                                toggle_layer={ toggle_layer }
                                isCheckAll={ isCheckAll }
                                check={ check }
                                toggle_check={ toggle_check }
                                clasterCount={ clasterCount }
                                check_all={ check_all }
                                checkAll={ checkAll }
                            />
                            <Info info={ info } />
                        </div>
                        <div className="main__chart">
                            <Chart />
                            <BarChart />
                        </div>
                    </div>
                    <div className="aside">
                        <Menu get_submenu={ get_submenu } toggleMenu={ toggleMenu } showMenu={ showMenu }/>
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
