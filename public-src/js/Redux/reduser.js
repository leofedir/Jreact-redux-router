import { combineReducers } from 'redux'
import { TOGGLE_MENU, } from "./actions"




const initialState = {
    hide_menu: false
}

function toggle_menu(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU :
            return Object.assign({}, state, {
                hide_menu: !state.hide_menu
            });
        default:
            return state
    }
}

const todoApp = combineReducers({
    toggle_menu
})

export default todoApp