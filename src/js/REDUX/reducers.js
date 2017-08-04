import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { routerReducer } from 'react-router-redux';

// Initial routing state
const routeInitialState = {
	locationBeforeTransitions: null
};

/**
 * Merge route into the global application state
 */
function routeReducer( state = routeInitialState, action ) {
	switch (action.type) {
		/* istanbul ignore next */
		case LOCATION_CHANGE:
			return {...state, locationBeforeTransitions: action.payload};

		default:
			return state;
	}
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
	return combineReducers({
		route: routeReducer,
		router: routerReducer
	})
}
