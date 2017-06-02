import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './App';
import {Provider} from 'react-redux';
import configureStore from './REDUX/store/configureStore';

import "../lib/font-awesome/scss/font-awesome.scss";
import '../scss/index.scss'

export const store = configureStore()

const rootEl = document.getElementById('root')
const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>, rootEl
    );
};

render(App);
