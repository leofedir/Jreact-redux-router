import React, { Component } from 'react';

import MainMenu from './PageElement/MainMenu';
import Map from './PageElement/Map';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null,
            showMenu: true
        };
    }

    hideMenu(){
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    componentDidMount() {}

    render() {
        return (
            <div id="wrapper" className={(this.state.showMenu) ? '' : "hide"}>
                <MainMenu />
                <div className="heder" >
                    <i className="fa fa-bars fa-2x menu_ico" onClick={::this.hideMenu} id="hide_menu"/>
                    <a className="logo-link" href="/"><img className="logo-link_img" src="./img/Logo.svg" alt=""/></a>
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="block block-top block_map" ><Map /></div>
                        <div className="block block-bottom" />

                    </div>
                    <div className="aside aside-1">
                        <div className="block block-top" />
                        <div className="block block-bottom" />
                    </div>

                    <div className="aside aside-2">
                        <div className="block block-top" />
                        <div className="block block-bottom" />
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
