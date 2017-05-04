import {
    TOGGLE_MENU,
    FULL_MAP,
    GET_SUBMENU,
    GET_SUBMENU_REQUEST,
    GET_SUBMENU_SUCCESS,
    GET_SUBMENU_ERROR,
    SET_SUBMENU_ITEM,
    SET_RANGE_ITEMS,
    SET_RANGE_ITEM,
    SET_LEGEND_DATA,
    GET_CLASTER_REQUEST,
    GET_CLASTER_SUCCESS,
    GET_CLASTER_ERROR
} from '../actions/constant'

const initialState = {
    showMenu: true,
    category: 'main',
    fields: null,
    mapFull: false,
    fetching: false,
    submenu_item: '',
    range_items: '',
    range_item: 0,
    show_range: false,
    legend_data: null,
    claster_layers: null,
    title_map: ''
};

export default function main(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {...state, showMenu: action.payload};

        case FULL_MAP:
            return {...state,
                mapFull: action.payload,
                showMenu: false};

        case SET_SUBMENU_ITEM:
            return {...state, submenu_item: action.payload, legend_data: null, claster_layers: null};

        case GET_SUBMENU_REQUEST:
            return {...state, fetching: true, legend_data: null, claster_layers: null, title_map: action.payload};

        case SET_RANGE_ITEMS:
            return {...state, range_items: action.payload, show_range: true};

        case SET_RANGE_ITEM:
            return {...state, range_item: action.payload};

        case GET_SUBMENU_SUCCESS:
            return { ...state, fields: action.payload, fetching: false, submenu_item: '', range_items: '', show_range: false};

        case GET_SUBMENU_ERROR:
            return {...state, fields: null, fetching: false};

        case SET_LEGEND_DATA:
            return {...state, legend_data: action.payload};

        case GET_CLASTER_REQUEST:
            return {...state, fetching: true, claster_layers: null};

        case GET_CLASTER_SUCCESS:
            return {...state, fetching: false, claster_layers: action.payload};

        case GET_CLASTER_ERROR:
            return {...state, fetching: false};

        default:
            return state;
    }
}