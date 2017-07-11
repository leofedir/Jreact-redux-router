let __selectPoint = [];
let __label = null,
    __line = null;
export function clearSelectionChart() {
    __selectPoint = [];
    __label = null;
    __line = null;
}

export function compareChart(e) {

    if (Object.keys(__selectPoint).length < 2 && !e.point.selected) {
        __selectPoint[e.point.x] = e.point.y;
        e.point.select(true, true);
    }
    else if (e.point.selected) {
        e.point.select(false, true);
        delete __selectPoint[e.point.x];
    }
    else if (Object.keys(__selectPoint).length === 2) {
        alert('Оберіть не більше двох точок')
        return
    }

    if (Object.keys(__selectPoint).length < 2 && __label !== null) {
        __label.destroy();
        __line.destroy();
        __label = __line = null;
    }

    if (Object.keys(__selectPoint).length == 2) {

        let keys = Object.keys(__selectPoint).map(i => +i).sort((a,b) => b-a);
        console.log(keys)
        let resulr = __selectPoint[keys[0]] - __selectPoint[keys[1]];
        let persent = (resulr / __selectPoint[keys[1]]) * 100;
        persent = persent.toFixed(2);

        __line = this.chart.addSeries({
            enableMouseTracking: false,
            dashStyle: 'Dash',
            __lineWidth: 1,
            showInLegend: false,
            allowPointSelect: false,
            data__labels: false,
            color: '#27ae60',
            data: [
                [+keys[1], __selectPoint[keys[1]]], [+keys[0], __selectPoint[keys[1]]],
                null,
                [+keys[0], __selectPoint[keys[0]]], [+keys[0], __selectPoint[keys[1]]]
            ]
        });
        let point = this.chart.series[1].points[1];

        let labelTEXT = `<p className="__labelChart">${new Intl.NumberFormat().format(resulr)} <span>(${persent} %)</span></p> `;

        __label = this.chart.renderer.label(labelTEXT, point.plotX, point.plotY, 'callout', point.plotX + this.chart.plotLeft, point.plotY + this.chart.plotTop, true)
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