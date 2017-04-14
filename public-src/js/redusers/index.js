import { combineReducers } from 'redux'
import menu from './toggle_menu'
import user from './user'

export default combineReducers({
    menu,
    user
})