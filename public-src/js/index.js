import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './REDUX/store/configureStore';

import "../lib/font-awesome/scss/font-awesome.scss";
import '../scss/index.scss'

export const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
