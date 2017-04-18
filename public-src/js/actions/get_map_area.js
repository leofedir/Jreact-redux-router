import {checkStatus, parseJSON} from '../checkJSON';
import getMap from '../getMapArea'

import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR

} from './constant';


export function get_map_area(url) {
    return (dispatch) => {
        dispatch({
            type: GET_MAP_AREA_REQUEST,
            payload: url
        })

        fetch('/render', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `table=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                getMap(data);

                dispatch({
                    type: GET_MAP_AREA_SUCCESS
                })

            }).catch(() => {
                dispatch({
                    type: GET_MAP_AREA_ERROR
                })
        });
    }
}
