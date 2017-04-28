import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR,
    CLICK_ON_FEATURE,
    BARCHART_TOGGLE,
    GET_MAP_DATA_SUCCESS,
    GET_MAP_DATA_REQUEST,
    SHOW_CLASTER,
    CLICK_ON_FEATURE_CLASTER,
    GET_LAYER_REQUEST,
    GET_LAYER_SUCCESS,
    GET_LAYER_ERROR,
    GET_CLASTER_SUCCESS,
    GET_SUBMENU_REQUEST
} from '../actions/constant'

const initialState = {
    curentMap: null,
    info: null,
    fetching_map: false,
    feature: null,
    alias: null,
    properties: null,
    bar_cahrt_full: false,
    data_success: false,
    claster: false,
    feature_claster: null
};

export default function map(state = initialState, action) {
    switch (action.type) {

        case GET_MAP_AREA_REQUEST:
            return {...state, fetching_map: true, curentMap: action.payload[0], alias: action.payload[1]};

        case GET_MAP_AREA_SUCCESS:
            return {...state, fetching_map: false, info: action.payload[0], feature: null}

        case GET_MAP_AREA_ERROR:
            return {...state, fetching_map: false};

        case GET_MAP_DATA_REQUEST:
            return {...state, data_success: false};

        case GET_MAP_DATA_SUCCESS:
            return {...state, properties: action.payload, data_success: true};

        case BARCHART_TOGGLE:
            return {...state, bar_cahrt_full: action.payload};

        case CLICK_ON_FEATURE:
            return {...state, feature: action.payload};

        case CLICK_ON_FEATURE_CLASTER:
            return {...state, feature_claster: action.payload};

        case SHOW_CLASTER:
            return {...state, claster: action.payload};

        case GET_LAYER_REQUEST:
            return {...state, fetching_map: true};

        case GET_LAYER_SUCCESS:
            return {...state, fetching_map: false};

        case GET_LAYER_ERROR:
            return {...state, fetching_map: false};

        case GET_CLASTER_SUCCESS:
            return {...state, info: action.payload[0][0]};

        case GET_SUBMENU_REQUEST:
            return {...state, info: null, properties: null, data_success: false};

        default:
            return state;
    }
}