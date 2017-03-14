import React, { Component } from 'react';

class App extends Component {

    componentDidMount() {
        console.log('ok')
    }

    render() {

        return (
            <div className="main_header">
                <a href="/"><img className="logo" src="./img/Logo.svg" alt=""/></a>
            </div>
        );
    }
}

export default App;
