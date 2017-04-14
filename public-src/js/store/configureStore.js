import { createStore,} from "redux";
import rootReducer from "../redusers";

export default function configureteStore(initialState) {
    return createStore(rootReducer, initialState);
}