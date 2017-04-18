import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { checkStatus, parseJSON} from './checkJSON';

import Map from './PageElement/Map';
import Menu from './PageElement/Menu';
import ButtonMenu from './PageElement/buttonMenu';
import * as Actions from './actions/actions';

let wrapper = document.getElementById('wrapper')


class App extends Component {

    full() {

    }

    displayTabs(){
        const tabs = this.state.tabs.map((t, i) => {
            return <li key={i} className={this.state.tab == i ? 'select' : ''} onClick={this.switchTabs.bind(this, i)}><a >{t.label}</a></li>
        });
        return (
            <ul className="tab-nav">
                {tabs}
            </ul>
        )
    }

    render() {
        const { category, fields, showMenu, mapFull } = this.props.main;
        const togglMenu = this.props.Actions.toggleMenu;
        const resizeMap = this.props.Actions.resizeMap;
        const get_submenu = this.props.Actions.get_submenu;

        return (
            <div id="wrapper" className={ (showMenu ? '' : 'hide' ) + (mapFull ? ' mapFull' : '')}>
                <div className="heder">
                   <ButtonMenu toggleMenu={ togglMenu } showMenu={ showMenu }/>
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="main__map">
                            <Map category={category} fields={fields} resizeMap={ resizeMap } mapFull={ mapFull }/>
                        </div>
                        <div className="main__right">

                                <div className="slider" id="slider"/>

                            <div className="legend">
                                <div className="item_header">
                                    <div className="map_heder_title">Легенда</div>
                                </div>
                                <div className="item_content">
                                    <div className="item_content" id="legend" />
                                </div>
                            </div>

                                <div className="info">
                                    <div className="item_header">
                                        <div className="map_heder_title">777</div>
                                    </div>
                                    <div className="item_content">
                                        Lorem ipsum dolor sit amet
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="item_header">
                                        <div className="map_heder_title">333</div>
                                    </div>
                                    <div className="item_content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante.
                                    </div>
                                </div>
                        </div>
                        <div className="main__chart">
                            <div className="chart_1">
                                <div className="item_header">
                                    <div className="map_heder_title">Аналітика</div>
                                    <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                       onClick={::this.full}/></div>
                                <div className="item_content item_diagram"/>
                            </div>
                            <div className="chart_2">
                                <div className="item_header">
                                    <div className="map_heder_title">Аналітика</div>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
