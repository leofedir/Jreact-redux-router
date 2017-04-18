import { createStore, applyMiddleware,} from "redux";
import rootReducer from "../redusers";
import createLogger from 'redux-logger';
import thunk from 'redux-thunk' // <-- добавили redux-thunk

export default function configureteStore(initialState) {
    const logger = createLogger
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger)
    )
    return store
}