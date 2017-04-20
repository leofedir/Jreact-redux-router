import {checkStatus, parseJSON} from '../checkJSON';
import getMap from '../getMapArea'

import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR,
    CLICK_ON_FEATURE,
    BARCHART_TOGGLE

} from './constant';


export function get_map_area(url, rebuild = true, alias) {
    return (dispatch) => {
        dispatch({
            type: GET_MAP_AREA_REQUEST,
            payload: [url, alias]
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
                getMap(data[1], rebuild);
                let properties = data[1].map(item => {
                    return item.properties
                })
                dispatch({
                    type: GET_MAP_AREA_SUCCESS,
                    payload: [data[0], properties]
                })

            }).catch(() => {
                dispatch({
                    type: GET_MAP_AREA_ERROR
                })
        });
    }
}

export function clickOnFeature(feature) {
    return {
        type: CLICK_ON_FEATURE,
        payload: feature
    }
}

export function barChartToggle(state) {
    return {
        type: BARCHART_TOGGLE,
        payload: !state
    }
}