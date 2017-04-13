/*
 * типы действий
 */

export const TOGGLE_MENU = 'TOGGLE_MENU'

/*
 * другие константы
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * генераторы действий
 */

export function toggleMenu() {
    return { type: TOGGLE_MENU }
}
