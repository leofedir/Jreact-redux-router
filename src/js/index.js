import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';

import App from './App';
import configureStore from './REDUX/store';
import createRoutes from './routes';

const initialState = {};
const store = configureStore(initialState, BrowserRouter);

const rootRoute = {
	component: App,
	childRoutes: createRoutes(store),
};

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router
				history={history}
				routes={rootRoute}
			/>
		</Provider>,
		document.getElementById('root')
	);
};

if (module.hot) {
	module.hot.accept('./App', () => {
		render();
	});
}


