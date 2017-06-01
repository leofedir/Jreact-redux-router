import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './REDUX/actions/actions';
import * as MapActions from './REDUX/actions/get_map_area';

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
import BubbleChart from './PageElement/BubbleChart';


let wrapper = document.getElementById('wrapper')


class App extends Component {
    
    render() {
        // console.log('this.props >>', this.props)
        const {showMenu, mapFull, range_items, range_item, show_range, title_map} = this.props.main;
        const {info, feature, alias, feature_claster, bar_chart_full, chart_full, bubble_chart_full} = this.props.map_reducer;
        const {toggleMenu, get_submenu, set_Range_item} = this.props.Actions;
        const {set_chart_data,} = this.props.MapActions;
        const mainRightStyle = ((bubble_chart_full || bar_chart_full) || (chart_full)) ? `disabled` : ``;
        const mainChartStyle = ((bubble_chart_full || bar_chart_full) || (chart_full)) ? `zero-height`: ``;
        console.log('mapFull >>', mapFull );
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
                            <Map />
                        </div>
                        <div className={`main__right ${mainRightStyle}`}>
                            <SliderRange range_items={ range_items} range_item={ range_item}
                                         set_Range_item={ set_Range_item } show_range={ show_range }/>
                            <Popup feature={ feature } alias={ alias } feature_claster={ feature_claster } set_chart_data={ set_chart_data } />
                            <Legend />
                            <Info info={ info } />
                        </div>
                        <div className={`main__chart ${mainChartStyle}`}>
                            <Chart />
                            <BarChart />
                        </div>
                        <div className={`main__chart ${mainChartStyle}`}>
                            <BubbleChart />
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
