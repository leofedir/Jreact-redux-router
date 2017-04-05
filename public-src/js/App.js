import React, { Component } from 'react';

import MainMenu from './PageElement/MainMenu';
import Map from './PageElement/Map';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null
        };
    }



    componentDidMount() {}

    render() {
        return (
            <div id="wrapper">
                <div className="heder" />
                <div className="content__wrap">
                    <MainMenu />
                    <div className="main">
                        <div className="block block-top"><Map /></div>
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
