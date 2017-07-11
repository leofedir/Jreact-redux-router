let _selectPoint = {};
let _label = null,
    _line = null;

export function clearSelectionChart() {
    _selectPoint = {};
    _label = null;
    _line = null;
}

export function compareChart(e) {

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

        let keys = Object.keys(_selectPoint).map(i => +i).sort((a,b) => b-a);
        console.log(keys)
        let resulr = _selectPoint[keys[0]] - _selectPoint[keys[1]];
        let persent = (resulr / _selectPoint[keys[1]]) * 100;
        persent = persent.toFixed(2);

        _line = this.chart.addSeries({
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
        let point = this.chart.series[1].points[1];

        let labelTEXT = `<p className="_labelChart">${new Intl.NumberFormat().format(resulr)} <span>(${persent} %)</span></p> `;

        _label = this.chart.renderer.label(labelTEXT, point.plotX, point.plotY, 'callout', point.plotX + this.chart.plotLeft, point.plotY + this.chart.plotTop, true)
            .css({
                color: '#FFFFFF'
            })
            .attr({
                fill: 'rgba(0, 0, 0, 0.75)',
                padding: 8,
                r: 10,
                zIndex: 6
            })
            .add();
    }
}