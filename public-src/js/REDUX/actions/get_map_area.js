import {checkStatus, parseJSON} from '../../checkJSON';
import getMap from '../../getMapArea';
import claster from '../../renderClaster/claster'

import {
    GET_MAP_AREA_REQUEST,
    GET_MAP_AREA_SUCCESS,
    GET_MAP_AREA_ERROR,
    CLICK_ON_FEATURE,
    BARCHART_TOGGLE,
    GET_MAP_DATA_SUCCESS,
    GET_MAP_DATA_ERROR,
    GET_MAP_DATA_REQUEST,
    SHOW_CLASTER,
    GET_CLASTER_ITEMS_REQUEST,
    GET_CLASTER_ITEMS_SUCCESS,
    GET_CLASTER_ITEMS_ERROR,
    CLICK_ON_FEATURE_CLASTER,

} from './constant';


export function get_map_area(url, rebuild = true, alias, range_item) {
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
                getMap(data[1], rebuild, range_item);
                dispatch({
                    type: GET_MAP_AREA_SUCCESS,
                    payload: [data[0]]
                })

            }).catch((err) => {
                console.log('err >>', err);
                dispatch({
                    type: GET_MAP_AREA_ERROR
                })
        });
    }
}

export function getMapData(tableData= null, arr = null){
    return (dispatch) => {
        dispatch({
            type: GET_MAP_DATA_REQUEST
        });

        if(arr !== null && tableData !== null) {
            Promise.all(tableData.map((item, i) =>
                fetch('/getmapdata', {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: `table=${ item }`
                }).then(parseJSON)
            )).then((resp) => {
                let obj = {};
                  resp.forEach((item, i) => obj[arr[i]] = item)
                  dispatch({
                      type: GET_MAP_DATA_SUCCESS,
                      payload: obj
                  })
                }).catch((err) => {
                    console.log('err >>', err);
                    dispatch({
                        type: GET_MAP_DATA_ERROR
                    })})
        }
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

export function show_claster(state, mapName) {
    return (dispatch) => {
        dispatch({
            type: GET_CLASTER_ITEMS_REQUEST
        });

        dispatch({
            type: SHOW_CLASTER,
            payload: !state
        });

        fetch('/claster_layers', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `table=${ mapName }`
        }).then(checkStatus)
          .then(parseJSON)
            .then(data => {
                // claster(data);
                dispatch({
                    type: GET_CLASTER_ITEMS_SUCCESS,
                    payload: data
                })
            }).catch((err) => {
            console.log('err >>', err);
            dispatch({
                type: GET_CLASTER_ITEMS_ERROR
            })})
    }
}

export function clickOnFeatureClaster(feature) {
    return {
        type: CLICK_ON_FEATURE_CLASTER,
        payload: feature
    }
}
