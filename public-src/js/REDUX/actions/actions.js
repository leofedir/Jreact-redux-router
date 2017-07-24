import { checkStatus, parseJSON} from '../../checkJSON';

import {
    TOGGLE_MENU,
    FULL_MAP,
    GET_SUBMENU_SUCCESS,
    GET_SUBMENU_ERROR,
    SET_SUBMENU_ITEM,
    SET_RANGE_ITEMS,
    SET_RANGE_ITEM,
    SET_LEGEND_DATA,
    TOGGLE_SLIDER_PICKER,
    TOGGLE_POPUP_FULLSIZE,
    CHANGE_INPET_SEARCH,
    SHOW_INPUT,
    SHOW_COMPARE


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

export function get_submenu(url, title) {
    return (dispatch) => {
        // dispatch({
        //     type: GET_SUBMENU_REQUEST,
        //     payload: title
        // })

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
                    payload: {data, title}
                })
            })
            .catch(e => {
            console.log('e >>', e)
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

export function set_Range_items(items, item = 0) {
    let item_name = items.map(item => {
        let year = item.substring(item.lastIndexOf('_') + 1);
        return year.length == 2 ? 20 + year : year;
    });

    item_name.sort();

    return {
        type: SET_RANGE_ITEMS,
        payload: {
            items: items,
            item: item,
            item_name
        }
    }
}

export function set_Range_item(item) {
    return {
        type: SET_RANGE_ITEM,
        payload: item
    }
}

export function set_legend_data(data) {
    return {
        type: SET_LEGEND_DATA,
        payload: data
    }
}

export function toggle_Slider_Picker(slider) {
    return {
        type: TOGGLE_SLIDER_PICKER,
        payload: slider
    }
}

export function toggle_Popup_Fullsize(fullsize) {
    return {
        type: TOGGLE_POPUP_FULLSIZE,
        payload: fullsize
    }
}

export function changeInpeuSearch(val) {
    return {
        type: CHANGE_INPET_SEARCH,
        payload: val
    }
}

export function showInput(bool) {
    return {
        type: SHOW_INPUT,
        payload: !bool
    }
}

export function showCompareFunc(bool) {
    return {
        type: SHOW_COMPARE,
        payload: bool
    }
}
