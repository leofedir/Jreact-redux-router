import { TOGGLE_MENU, FULL_MAP, GET_MAPS } from './constant'

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

export function get_submenu(table) {
    return {
        type: GET_MAPS,
        payload: table
    }
}