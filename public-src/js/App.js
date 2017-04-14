import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { checkStatus, parseJSON} from './checkJSON';

import Map from './PageElement/Map';
import Menu from './PageElement/Menu';
import ButtonMenu from './PageElement/buttonMenu';
import * as menuActions from './actions/menu_actions';

let wrapper = document.getElementById('wrapper')


class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         folder: null,
    //         item: null,
    //         category: 'main',
    //         fields: null,
    //         tab : 0,
    //         tabs : [
    //             {
    //                 label : 'Диаграмма',
    //                 data:
    //                     <div>
    //                         <h1>Hello world1</h1>
    //                         <p>Hello world1</p>
    //                     </div>
    //             },
    //             {
    //                 label : 'Тренд',
    //                 data:
    //                     <div>
    //                         <h1>Hello world2</h1>
    //                         <p>Hello world2</p>
    //                     </div>
    //             },
    //             {
    //                 label : 'Теплова карта',
    //                 data:
    //                     <div>
    //                         <h1>Hello world3</h1>
    //                         <p>Hello world3</p>
    //                     </div>
    //             }
    //         ]
    //     };
    // }

    chengeCategory(e) {
        let url = e.target.dataset.url
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `category=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                this.setState({
                    category: url,
                    fields: Object.keys(data)
                })
            })
    }

    // autoCloseMenu() {
    //     function removePopups(e) {
    //         if (!e.target.matches('.menu *') && !e.target.matches('.menu_ico') && !document.getElementById('wrapper').classList.contains('hide') ) {
    //             document.getElementById('wrapper').classList.toggle('hide')
    //             window.removeEventListener('click', removePopups);
    //         }
    //     };
    //     window.addEventListener('click', removePopups.bind(this));
    // }

    // hideMenu() {
    //     this.setState({
    //         menu : this.state.menu == 'hide'  ? '' : 'hide'
    //     });
    //     // document.getElementById('wrapper').classList.toggle('hide')
    // }

    switchTabs(tab){
        this.setState({
            tab
        })
    }

    full() {

    }

    // componentWillMount() {
    //     this.autoCloseMenu()
    // }
    //
    // componentWillUpdate() {
    //     this.autoCloseMenu()
    // }

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
        const { category, fields, showMenu } = this.props.menu;
        const togglMenu = this.props.menuActions.toggleMenu;

        return (
            <div id="wrapper" className={ showMenu ? '' : 'hide'}>
                <div className="heder">
                   <ButtonMenu toggleMenu={ togglMenu } showMenu={ showMenu }/>
                    {/*<a className="logo-link" href="/"><img className="logo-link_img" src="./img/Logo.svg" alt=""/></a>*/}
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="main__map">
                            <Map category={category} fields={fields}/>
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
                                <div className="item_content item_diagram">
                                    {/*<div className="v-tab">*/}
                                        {/*<div className="tab-box">*/}
                                            {/*{this.displayTabs()}*/}
                                            {/*<div className="tab-panels">*/}
                                                {/*{this.state.tabs.map((e, i) => {*/}
                                                    {/*return <div key={i}*/}
                                                                {/*style={{display: this.state.tab == i ? 'block' : 'none'}}>{e.data}</div>*/}
                                                {/*})}*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>
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
                        <Menu />
                    </div>



                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuActions: bindActionCreators(menuActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
