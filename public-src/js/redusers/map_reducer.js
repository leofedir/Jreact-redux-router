import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR,
    CLICK_ON_FEATURE,
    BARCHART_TOGGLE
} from '../actions/constant'

const initialState = {
    curentMap: null,
    info: null,
    fetching_map: false,
    feature: null,
    alias: null,
    properties: null,
    bar_cahrt_full: false
};

export default function map(state = initialState, action) {
    switch (action.type) {

        case GET_MAP_AREA_REQUEST:
            return {...state, fetching_map: true, curentMap: action.payload[0], alias: action.payload[1]};

        case GET_MAP_AREA_SUCCESS:
            return {...state, fetching_map: false, info: action.payload[0], feature: null, properties: action.payload[1]}

        case GET_MAP_AREA_ERROR:
            return {...state, fetching_map: false}

        case BARCHART_TOGGLE:
            return {...state, bar_cahrt_full: action.payload}

        case CLICK_ON_FEATURE:
            return {...state, feature: action.payload}

        default:
            return state;
    }
}