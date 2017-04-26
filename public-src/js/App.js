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
        const {category, fields, showMenu, mapFull, fetching, range_items, range_item, show_range, legend_data, claster_layers} = this.props.main;
        const {fetching_map, curentMap, info, feature, alias, claster, feature_claster} = this.props.map_reducer;
        const {toggleMenu, resizeMap, get_submenu, set_Range_item} = this.props.Actions;
        const {get_map_area} = this.props.MapActions;

        return (
            <div id="wrapper" className={ (showMenu ? '' : 'hide' ) + (mapFull ? ' mapFull' : '')}>
                <div className="heder">

                    <a className="logo_link" href="/"></a>
                    <ButtonMenu toggleMenu={ toggleMenu } showMenu={ showMenu }/>
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
                            />
                        </div>
                        <div className="main__right">

                            <SliderRange range_items={ range_items} range_item={ range_item}
                                         set_Range_item={ set_Range_item } show_range={ show_range }/>

                            <Popup feature={ feature } alias={ alias } feature_claster={ feature_claster }/>

                            <div className="info">
                                <div className="item_header">
                                    <div className="map_heder_title">Довідка</div>
                                </div>
                                <div className="item_content">
                                    <div id="info"
                                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '&nbsp; &nbsp;Україна - держава у Східній Європі. Столиця - м.Київ. Площа - 60 357 712 га. Населення - 44 933 290 особи'}}/>
                                </div>
                            </div>
                            <Legend legend_data={ legend_data } claster_layers={ claster_layers } />
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
