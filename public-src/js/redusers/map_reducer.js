import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS
} from '../actions/constant'

const initialState = {
    curentMap: null
};

export default function map(state = initialState, action) {
    switch (action.type) {

        case GET_MAP_AREA_REQUEST:
            return {...state, fetching_map: true, curentMap: action.payload}

        case GET_MAP_AREA_SUCCESS:
            return {...state, fetching_map: false}

        default:
            return state;
    }
}