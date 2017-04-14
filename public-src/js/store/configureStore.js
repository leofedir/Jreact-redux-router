import { createStore, applyMiddleware,} from "redux";
import rootReducer from "../redusers";
import createLogger from 'redux-logger'

export default function configureteStore(initialState) {
    const logger = createLogger
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger)
    )
    return store
}