import { TOGGLE_MENU, FULL_MAP } from './constant'

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