import { checkStatus, parseJSON} from '../checkJSON';

import {
    TOGGLE_MENU,
    FULL_MAP,
    GET_SUBMENU_REQUEST,
    GET_SUBMENU_SUCCESS,
    GET_SUBMENU_ERROR
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
    console.log('url >>', url)
    return (dispatch) => {
        dispatch({
            type: GET_SUBMENU_REQUEST
        })

        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `category=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                console.log('data >>', data)
                dispatch({
                    type: GET_SUBMENU_SUCCESS,
                    payload: Object.keys(data)
                })
            }).catch(() => {
                dispatch({
                    type: GET_SUBMENU_ERROR
                })
        })
    }
}