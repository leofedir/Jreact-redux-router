import { FULL_MAP } from '../actions/constant'

const initialState = {
    mapFull: false
};

export default function menu(state = initialState, action) {
    switch (action.type) {
        case FULL_MAP:
            return {...state,
                    mapFull: action.payload,
                    showMenu: false}

        default:
            return state;
    }
}