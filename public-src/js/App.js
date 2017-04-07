import React, {Component} from 'react';

import MainMenu from './PageElement/MainMenu';
import Map from './PageElement/Map';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null,
            showMenu: true,
            mapFull: false
        };
    }

    autoCloseMenu() {
        function removePopups(e) {
            if (!e.target.matches('.menu *') && !e.target.matches('.menu_ico') && this.state.showMenu) {
                this.setState({
                    showMenu: !this.state.showMenu
                });
                window.removeEventListener('click', removePopups);
            }
        };
        window.addEventListener('click', removePopups.bind(this));
    }

    hideMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    mapFull() {
        console.log('this.state >>', this.state.mapFull)
        this.setState({
            mapFull: !this.state.mapFull
        });
    }

    componentWillMount() {
        console.log('mount')
        this.autoCloseMenu()
    }

    componentWillUpdate() {
        console.log('update')
        this.autoCloseMenu()
    }

    render() {
        return (
            <div id="wrapper"
                 className={(this.state.showMenu) ? "" + ( ( this.state.mapFull ) ? "mapFull" : "") : "hide " + ( ( this.state.mapFull ) ? "mapFull" : "")}>
                <MainMenu />
                <div className="heder">
                    <i className="fa fa-bars fa-2x menu_ico" onClick={::this.hideMenu} id="hide_menu"/>
                    <a className="logo-link" href="/"><img className="logo-link_img" src="./img/Logo.svg" alt=""/></a>
                </div>
                <div className="content__wrap">

                    <div className="main">
                        <div className="block block-top block_map">
                            <div className="item_header">
                                <div className="map_heder_title">1111</div>
                                <i className="fa fa-expand fa-1x ico_map_full ico_hover" onClick={::this.mapFull}/>
                            </div>
                            <Map />
                        </div>
                        <div className="block block-bottom">
                            <div className="item_header">
                                <div className="map_heder_title">444</div>
                                <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                   onClick={::this.mapFull}/></div>
                        </div>

                    </div>
                    <div className="aside aside-1">
                        <div className="block block-top">
                            <div className="item_header">
                                <div className="map_heder_title">222</div>
                            </div>
                        </div>
                        <div className="block block-bottom">
                            <div className="item_header">
                                <div className="map_heder_title">5555</div>
                                <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                   onClick={::this.mapFull}/></div>
                        </div>
                    </div>

                    <div className="aside aside-2">
                        <div className="block block-top">
                            <div className="item_header">
                                <div className="map_heder_title">333</div>
                            </div>
                        </div>
                        <div className="block block-bottom">
                            <div className="item_header">
                                <div className="map_heder_title">666</div>
                            </div>
                            <div id="legend"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
