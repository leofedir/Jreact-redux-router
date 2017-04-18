import { combineReducers } from 'redux'
import main from './main';
import map_reducer from './map_reducer'

export default combineReducers({
    main,
    map_reducer
})