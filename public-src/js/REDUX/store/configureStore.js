import { createStore, applyMiddleware,} from "redux";
import rootReducer from "../redusers";
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

export default function configureteStore(initialState) {
    const logger = createLogger;

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger)
    );
    if (module.hot) {
        module.hot.accept('../redusers', () => {
            const nextRootReducer = require('../redusers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store

}