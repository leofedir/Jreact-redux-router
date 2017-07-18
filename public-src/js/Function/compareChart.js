let _selectPoint = {};
let _label = null,
    _line = null;

export function clearSelectionChart() {
    _selectPoint = {};
    _label = null;
    _line = null;
}

export function compareChart(e, feature, chart) {
    if (Object.keys(_selectPoint).length < 2 && !e.point.selected) {
        _selectPoint[e.point.x] = e.point.y;
        e.point.select(true, true);
    }
    else if (e.point.selected) {
        e.point.select(false, true);
        delete _selectPoint[e.point.x];
    }
    else if (Object.keys(_selectPoint).length === 2) {
        e.point.select(false, false);
        _label.destroy();
        _line.destroy();
        _label = _line = null;
        _selectPoint = {};
        return
    }

    if (Object.keys(_selectPoint).length < 2 && _label !== null) {
        _label.destroy();
        _line.destroy();
        _label = _line = null;
    }

    if (Object.keys(_selectPoint).length == 2) {
        
        let keys = Object.keys(_selectPoint).map(i => +i).sort((a, b) => b - a);
        let resulr = _selectPoint[keys[0]] - _selectPoint[keys[1]];
        let persent = (resulr / _selectPoint[keys[1]]) * 100;
        persent = feature.parameter == "%" ? "" : `<span>  (${persent.toFixed(2)} %) </span>`;

        _line = chart.addSeries({
            enableMouseTracking: false,
            dashStyle: 'Dash',
            _lineWidth: 1,
            showInLegend: false,
            allowPointSelect: false,
            data_labels: false,
            color: '#27ae60',
            data: [
                [+keys[1], _selectPoint[keys[1]]], [+keys[0], _selectPoint[keys[1]]],
                null,
                [+keys[0], _selectPoint[keys[0]]], [+keys[0], _selectPoint[keys[1]]]
            ]
        });
        let point = chart.series[1].points[1];

        let x = point.plotX + chart.plotLeft;
        let y = point.plotY + chart.plotTop;
        let chartW = chart.chartWidth;

        let labelTEXT = `<p className="labelChart">${new Intl.NumberFormat().format(resulr) } ${feature.parameter}  ${persent}</p> `;

        _label = chart.renderer.label(labelTEXT, point.plotX, point.plotY, 'callout', x, y, true)
            .css({
                color: '#FFFFFF'
            })
            .attr({
                // fill: resulr < 0 ? 'rgba(255, 102, 102, 0.75)' : 'rgba(77, 184, 255, 0.85)',
                fill: resulr < 0 ? 'rgba(255, 102, 102, 0.75)' : 'rgba(102, 204, 153, 0.9)',
                padding: 8,
                r: 10,
                zIndex: 6
            })
            .add();

        let _position = _label.width + 20 / 2 < chartW - x;

        _position ? '' :  _label.xSetter(point.plotX - ((_label.width + 20 / 2) - (chartW - x) ));
    }
}