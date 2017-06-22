import {checkStatus, parseJSON} from '../../checkJSON';
import getMap from '../../getMapArea';
import {layersTriger, cleanClasterAll} from '../../renderClaster/claster'
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
    CLICK_ON_FEATURE_CLASTER,
    TOGGLE_LAYER,
    GET_CLASTER_REQUEST,
    GET_CLASTER_SUCCESS,
    GET_CLASTER_ERROR,
    SET_CLASTER_CHART_DATA,
    CHART_TOGGLE,
    TOGGLE_CHECK,
    SET_INITIAL_CHECK,
    CHECK_ALL,
    CHECK_ALL_ICON,
    TOGGLE_DATA,
    SET_DATA_BUBBLE,
    TOGGLE_CURENCY,
    SET_DATA_DISTRICT,
    TOGGLE_CHART_TO_STUDENT,
    BUBBLE_CHART_TOGGLE,
    SET_CURENCY,
    SET_IS_ALL_DATA
} from './constant';

// export function get_map_area(url, rebuild = true, alias, isRegion) {
//     let categori = url.slice(url.lastIndexOf('__'));
//
//     return (dispatch) => {
//         dispatch({
//             type: GET_MAP_AREA_REQUEST,
//             payload: [url, alias]
//         })
//
//         fetch('/render', {
//             method: 'post',
//             headers: {
//                 "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//             },
//             body: `table=${ url }`
//         })
//             .then(checkStatus)
//             .then(parseJSON)
//             .then(data => {
//                 getMap(data[1], rebuild, isRegion);
//                 dispatch({
//                     type: GET_MAP_AREA_SUCCESS,
//                     payload: {
//                         info: data[0],
//                         data: data[1],
//                         categori
//
//                     }
//                 });
//             }).catch((err) => {
//             console.log('err >>', err);
//             dispatch({
//                 type: GET_MAP_AREA_ERROR
//             })
//         });
//     }
// }

export function getMapData(tableData = null, arr = null, url, rebuild = true, alias, isRegion) {

    if (arr !== null && tableData !== null) {
        // let categori = tableData[1].slice(url.lastIndexOf('__'));

        return (dispatch) => {
            dispatch({
                type: GET_MAP_AREA_REQUEST,
                payload: [url, alias]
            })
            fetch('/getmapdata', {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: `table=${ tableData }&arr=${arr}`
            })
                .then(parseJSON)
                .then((data) => {
                    getMap(data[0], rebuild, isRegion);
                    dispatch({
                        type: GET_MAP_AREA_SUCCESS,
                        payload: data[1]
                    });
                })
                .catch((err) => {
                    console.log('err >>', err);
                    dispatch({
                        type: GET_MAP_DATA_ERROR
                    })
                })
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

export function ChartToggle(state) {
    return {
        type: CHART_TOGGLE,
        payload: !state
    }
}

export function BubbleChartToggle(state) {
    return {
        type: BUBBLE_CHART_TOGGLE,
        payload: !state
    }
}

export function show_claster(state, mapName) {
    return (dispatch) => {
        dispatch({
            type: GET_CLASTER_REQUEST
        });

        fetch('/claster_layers', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `table=${ mapName }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                claster(data.data);

                dispatch({
                    type: GET_CLASTER_SUCCESS,
                    payload: data
                });

                let arr = [];
                data.data.forEach((item, i) => arr.push(i === 0));

                dispatch({
                    type: SET_INITIAL_CHECK,
                    payload: arr
                });

            })
            .catch((err) => {
                console.error('err >>', err);
                dispatch({
                    type: GET_CLASTER_ERROR
                })
            })
    }
}

export function clickOnFeatureClaster(feature) {
    return {
        type: CLICK_ON_FEATURE_CLASTER,
        payload: feature
    }
}

export function toggle_layer(id, status) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LAYER
        });
        layersTriger(id, status)
    }
}

export function set_chart_data(chart1, chart2, chart3) {
    return {
        type: SET_CLASTER_CHART_DATA,
        payload: [chart1, chart2, chart3]
    }
}

export function toggle_check(arr) {
    return {
        type: TOGGLE_CHECK,
        payload: arr
    }
}

export function toggle_data(state) {
    return {
        type: TOGGLE_DATA,
        payload: !state
    }
}

export function toggle_curency(state) {
    return {
        type: TOGGLE_CURENCY,
        payload: state
    }
}

export function set_data_bubble(year) {
    return (dispatch) => {
        fetch('/data_bubble', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `year=${year}`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch({
                    type: SET_DATA_BUBBLE,
                    payload: data
                });
            })
            .catch((err) => {
                console.log('err >>', err);
            })
    }
}

export function set_data_district() {
    return {
        type: SET_DATA_DISTRICT,
    }
}

export function toggleChartToStudent(state) {
    return {
        type: TOGGLE_CHART_TO_STUDENT,
        payload: !state
    }
}

export function check_all(state, check) {
    let myCheck;
    if (state) {
        cleanClasterAll();
        myCheck = check.map(() => !state);
        toggle_check(myCheck);
    }
    else {
        myCheck = check.map((item, i) => {
            if (item === !state) {
                return !state
            }
            else {
                layersTriger(i, !state);
                return !state
            }
        });
        toggle_check(myCheck);
    }

    return (dispatch) => {
        dispatch({
            type: CHECK_ALL,
            payload: myCheck
        });
        dispatch({
            type: CHECK_ALL_ICON,
            payload: !state
        });

    }


}

export function setCurency(val) {
    return {
        type: SET_CURENCY,
        payload: val
    }
}

export function set_isAllData(isAllData) {
    return {
        type: SET_IS_ALL_DATA,
        payload: isAllData
    }
}