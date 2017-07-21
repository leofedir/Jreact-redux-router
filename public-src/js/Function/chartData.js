import {store} from '../index';
import {set_chart_data} from '../REDUX/actions/get_map_area'

export function chartData(feature_claster) {
    let chart1 = null;
    let chart2 = null;
    let chart3 = null;

    if (feature_claster !== null) {
        for (let key in feature_claster) {
            if (feature_claster.hasOwnProperty(key)) {
                let name = key.slice(0, key.indexOf('_'));
                let serias = key.slice(7, key.length - 5);
                let year = +key.slice(key.length - 4);
                let value = +feature_claster[key];

                if (name == 'chart1') {
                    chart1 === null ? chart1 = {} : '';
                    chart1[serias] ? chart1[serias].push({year, value}) : chart1[serias] = [{year, value}];
                }
                else if (name == 'chart2') {
                    chart2 === null ? chart2 = {} : '';
                    chart2[serias] ? chart2[serias].push({year, value}) : chart2[serias] = [{year, value}];
                }
                else if (name == 'chart3' || name == 'kilkistuchniv') {
                    chart3 === null ? chart3 = {} : '';
                    chart3[serias] ? chart3[serias].push({year, value}) : chart3[serias] = [{year, value}];
                }
            }
        }

        function sort_data(obj) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key].sort((a, b) => a.year - b.year)
                }
            }
        }

        sort_data(chart1);
        sort_data(chart2);
        sort_data(chart3);

        if (chart1 !== null) {
            store.dispatch(set_chart_data(chart1, chart2, chart3))
        }
    }
}