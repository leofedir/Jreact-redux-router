import { createStore, applyMiddleware} from "redux";
import rootReducer from "../redusers";

export default function configureteStore(initialState) {
    const store = createStore(rootReducer, initialState);
    return store;
}