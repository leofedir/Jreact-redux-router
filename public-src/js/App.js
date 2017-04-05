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
                <MainMenu />
                <Map />
            </div>
        );
    }
}

export default App;
