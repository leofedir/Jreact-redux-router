import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
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
    GET_SUBMENU_SUCCESS,
    SET_SUBMENU_ITEM,
    SET_CLASTER_CHART_DATA,
    CHART_TOGGLE,
    TOGGLE_CHECK,
    SET_INITIAL_CHECK,
    CHECK_ALL,
    CHECK_ALL_ICON,
    TOGGLE_DATA,
    SET_DATA_BUBBLE,
    TOGGLE_CURENCY,
    TOGGLE_CHART_TO_STUDENT,
    BUBBLE_CHART_TOGGLE
} from '../actions/constant'

const initialState = {
    curentMap: null,
    info: null,
    feature: null,
    alias: null,
    properties: null,
    bar_chart_full: false,
    chart_full: false,
    bubble_chart_full: false,
    data_success: false,
    claster: false,
    feature_claster: null,
    chart1: null,
    chart2: null,
    check: [],
    checkAll: false,
    clasterCount: 0,
    dataChartRegion: true,
    data_bubble: null,
    dataChartUsd: false,
    for1Student: false
};

export default function map(state = initialState, action) {
    switch (action.type) {

        case GET_MAP_AREA_REQUEST:
            return {...state, curentMap: action.payload[0], alias: action.payload[1]};

        case GET_MAP_AREA_SUCCESS:
            return {...state, info: action.payload[0], feature: null}

        case GET_MAP_DATA_REQUEST:
            return {...state, data_success: false, };

        case GET_MAP_DATA_SUCCESS:
            return {...state, properties: action.payload, data_success: true};

        case BARCHART_TOGGLE:
            return {...state, bar_chart_full: action.payload};

        case CHART_TOGGLE:
            return {...state, chart_full: action.payload};

        case BUBBLE_CHART_TOGGLE:
            return {...state, bubble_chart_full: action.payload};

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
            return {...state, info: action.payload.data[0][0], clasterCount: action.payload.count, check: [], claster: true};

        case GET_SUBMENU_SUCCESS:
            return {...state, info: null, properties: null, curentMap: null};

        case SET_SUBMENU_ITEM:
            return {...state,
                feature: null,
                claster: false,
                properties: null,
                chart1: null,
                data_success: false,
                chart2: null,
                curentMap: null,
                feature_claster: null,
                data_bubble: null};

        case SET_CLASTER_CHART_DATA:
            return {...state, chart1: action.payload[0], chart2: action.payload[1]};

        case SET_INITIAL_CHECK:
            return {...state, check: action.payload};

        case TOGGLE_CHECK:
            return {...state, check: action.payload, chart1: null, chart2: null};

        case CHECK_ALL_ICON:
            return {...state, checkAll: action.payload};

        case CHECK_ALL:
            return {...state, check: action.payload};

        case TOGGLE_DATA:
            return {...state, dataChartRegion: action.payload};

        case TOGGLE_CURENCY:
            return {...state, dataChartUsd: action.payload};

        case SET_DATA_BUBBLE:
            return {...state, data_bubble: action.payload};

        case TOGGLE_CHART_TO_STUDENT:
            return {...state, for1Student: action.payload};

        default:
            return state;
    }
}