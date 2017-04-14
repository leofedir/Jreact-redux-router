import { TOGGLE_MENU, FULL_MAP } from '../actions/constant'

const initialState = {
    showMenu: true,
    category: 'main',
    fields: null,
    mapFull: false
};

export default function menu(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {...state, showMenu: action.payload}

        case FULL_MAP:
            return {...state,
                mapFull: action.payload,
                showMenu: false}

        default:
            return state;
    }
}