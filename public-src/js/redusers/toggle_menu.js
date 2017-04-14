import { TOGGLE_MENU } from '../actions/constant'

const initialState = {
    showMenu: true,
    category: 'main',
    fields: null,
    toggleMenu: null
};

export default function menu(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {...state, showMenu: action.payload}

        default:
            return state;
    }
}