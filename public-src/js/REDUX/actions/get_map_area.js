import {checkStatus, parseJSON} from '../../checkJSON';
import getMap from '../../getMapArea'

import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR,
    CLICK_ON_FEATURE,
    BARCHART_TOGGLE,
    GET_MAP_DATA_SUCCESS,
    GET_MAP_DATA_ERROR

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
                console.log('data111 >>', data)
                getMap(data[1], rebuild);
                dispatch({
                    type: GET_MAP_AREA_SUCCESS,
                    payload: [data[0]]
                })

            }).catch(() => {
                dispatch({
                    type: GET_MAP_AREA_ERROR
                })
        });
    }
}

export function getMapData(tableData= null, arr = null){
    return (dispatch) => {
        fetch('/demography_data', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `table=${ tableData }&ident=${ arr }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                console.log('data >>', data)
                dispatch({
                    type: GET_MAP_DATA_SUCCESS,
                    payload: data
                })

            }).catch(() => {
            dispatch({
                type: GET_MAP_DATA_ERROR
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