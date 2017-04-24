import { checkStatus, parseJSON} from '../../checkJSON';

import {
    TOGGLE_MENU,
    FULL_MAP,
    GET_SUBMENU_REQUEST,
    GET_SUBMENU_SUCCESS,
    GET_SUBMENU_ERROR,
    SET_SUBMENU_ITEM,
    SET_RANGE_ITEMS,
    SET_RANGE_ITEM

} from './constant';

export function toggleMenu(curent) {
    return {
        type: TOGGLE_MENU,
        payload: !curent
    }
}

export function resizeMap(curent) {
    return {
        type: FULL_MAP,
        payload: !curent
    }
}

export function get_submenu(url) {
    return (dispatch) => {
        dispatch({
            type: GET_SUBMENU_REQUEST
        })

        fetch('getsubmenu', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `category=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch({
                    type: GET_SUBMENU_SUCCESS,
                    payload: data
                })
            }).catch(() => {
                dispatch({
                    type: GET_SUBMENU_ERROR
                })
        })
    }
}

export function set_submenu_item(item) {
    return {
        type: SET_SUBMENU_ITEM,
        payload: item
    }
}

export function set_Range_items(items) {
    return {
        type: SET_RANGE_ITEMS,
        payload: items
    }
}

export function set_Range_item(item) {
    return {
        type: SET_RANGE_ITEM,
        payload: item
    }
}