let _selectPoint = {};
let _label = null,
	count = 0;

export function clearSelectionChartMulti() {
	_selectPoint = {};
	_label = null;
	count = 0;
}

export function compareChartMulti( e, feature, chart ) {
	if (!e.point.selected && count < 2) {
		count++;
		chart.series.forEach(( series, i ) => {
			i in _selectPoint ? '' : _selectPoint[i] = {};
			_selectPoint[i][e.point.x] = e.point.y;
			series.data[e.point.x].select(true, true)
		});
		// e.point.select(true, true);
	}
	else if (e.point.selected) {
		chart.series.forEach(( series, i ) => {
			delete _selectPoint[i][e.point.x];
			series.data[e.point.x].select(false, true)
		});
		count--;
		delete _selectPoint[e.point.x];
	}
	else if (count === 2) {
		_label.destroy();
		chart.series.forEach(series => {
			series.data[e.point.x].select(false, false)
		});
		clearSelectionChartMulti()
		return
	}

	if (count < 2 && _label !== null) {
		_label.destroy();
		_label = _line = null;
	}

	if (count == 2) {
//TODO перебрати обект і вивести правильні дані

		let keys = Object.keys(_selectPoint).map(i => +i).sort(( a, b ) => b - a);
		let resulr = _selectPoint[keys[0]] - _selectPoint[keys[1]];
		let persent = (resulr / _selectPoint[keys[1]]) * 100;
		persent = feature.parameter == "%" ? "" : `<span>  (${persent.toFixed(2)} %) </span>`;

		let point = chart.series[1].points[1];

		let x = chart.chartWidth/2;
		let y = point.plotY + chart.plotTop;

		let labelTEXT = `<p className="labelChart">${new Intl.NumberFormat().format(resulr) } ${feature.parameter}  ${persent}</p> `;

		_label = chart.renderer.label(labelTEXT, x, 40, 'callout', x, y, true)
			.css({
				color: '#FFFFFF'
			})
			.attr({
				fill: resulr < 0 ? 'rgba(255, 102, 102, 0.75)' : 'rgba(102, 204, 153, 0.9)',
				padding: 8,
				r: 10,
				zIndex: 6
			})
			.add();
	}
}