import {
    TOGGLE_MENU,
    FULL_MAP,
    GET_SUBMENU,
    GET_SUBMENU_REQUEST,
    GET_SUBMENU_SUCCESS,
    GET_SUBMENU_ERROR,
    GET_MAP_AREA_REQUEST
} from '../actions/constant'

const initialState = {
    showMenu: true,
    category: 'main',
    fields: null,
    mapFull: false,
    fetching: false
};

export default function main(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {...state, showMenu: action.payload};

        case FULL_MAP:
            return {...state,
                mapFull: action.payload,
                showMenu: false};

        // case GET_SUBMENU:
        //     return {...state, category: action.payload, fetching: true};

        case GET_SUBMENU_REQUEST:
            return {...state, fetching: true};

        case GET_SUBMENU_SUCCESS:
            return { ...state, fields: action.payload, fetching: false};

        case GET_SUBMENU_ERROR:
            return {...state, fields: null, fetching: false}

        default:
            return state;
    }
}