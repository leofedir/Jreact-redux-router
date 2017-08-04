import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import createReducer from './reducers';


export default function configureStore( history ) {
	const initialState = {};
	const logger = createLogger;
	const middlewares = [
		routerMiddleware(history),
		logger,
		thunk
	];

	const store = createStore(
		createReducer(),
		initialState,
		applyMiddleware(...middlewares)
	);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			import('./reducers').then(( reducerModule ) => {
				const createReducers = reducerModule.default;
				const nextReducers = createReducers(store.asyncReducers);

				store.replaceReducer(nextReducers);
			});
		});
	}

	return store;
}
