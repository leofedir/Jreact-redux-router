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
import MultiChart from './PageElement/MultiChart';
import SliderRange from './PageElement/SliderRange';
import Legend from './PageElement/Legend';
import Info from './PageElement/info';
import MapTitle from './PageElement/MapTitle';
import BubbleChart from './PageElement/BubbleChart';

// let wrapper = document.getElementById('wrapper');

class App extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    render() {
        const {showMenu, mapFull} = this.props.main;
        const {data_bubble, chart3, data_success, feature, chart1, chart2} = this.props.map_reducer;
        // const mainRightStyle = ((bubble_chart_full || bar_chart_full) || (chart_full)) ? `disabled` : ``;
        // const mainChartStyle = ((bubble_chart_full || bar_chart_full) || (chart_full)) ? `zero-height`: ``;

        return (
            <div id="wrapper" className={ (showMenu ? '' : 'hide' ) + (mapFull ? ' mapFull' : '')}>
                <div className="heder">

                    <a className="logo_link" href="/"/>
                    <ButtonMenu />
                    <MapTitle />
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="main__map">
                            <Map />
                        </div>
                        <div className={`main__right`}>
                            <SliderRange />
                            <Popup />
                            <Legend />
                            <Info />
                        </div>
                        <div className={`main__chart`}>
                            {feature !== null || data_success ? <Chart /> : ""}
                            {data_success ? <BarChart /> : ''}
                        </div>
                        {data_bubble ? <div className={`main__chart `}><BubbleChart /></div> : ''}
                    </div>
                    <div className="aside">
                        <Menu />
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
