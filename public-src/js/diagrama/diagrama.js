import React, { Component } from 'react';
import * as d3 from 'd3';

let svg, data, row;

let ChengeState = null;


export function saveData(myParametr, myItem) {
    ChengeState({
        "myParametr":myParametr,
        'myItem': myItem,
        'visible': false
    });
}

class Diagrama extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            myParametr: data,
            myItem: row
        }
    }

    createHistogram() {
        let full = false;

        let el = document.querySelector('#diagrama')
        if (el) {
            el.innerHTML = "";
            el.style.cssText = "overflow-y: scroll";
        }

        let dataR = {
            children: [],
            name: 'Райони'
        };

        let dataM = {
            children: [],
            name: 'Міста'
        };

        let data = {
            children: [],
            name: 'Області'
        };
        // console.log('this.state.myParametr >>', this.state.myParametr)

        if ( this.state.myParametr[2]) {
            this.state.myParametr[2].features.forEach((item, i) => {
                let obj = {};
                obj.name = item.attributes.name_ua;
                obj.koatuu = item.attributes.koatuu;
                obj.size = (item.attributes[this.state.myItem] == null ) ? 0 : item.attributes[this.state.myItem];
                dataM.children.push(obj)
            })
        }
        // console.log('dataM >>', dataM)

        if ( this.state.myParametr[1]) {
            this.state.myParametr[1].features.forEach((item, i) => {
                let obj = {};
                obj.name = item.attributes.name_ua;
                obj.koatuu = item.attributes.koatuu;
                obj.size = (item.attributes[this.state.myItem] == null ) ? 0 : item.attributes[this.state.myItem];
                obj.children = dataM.children.filter(i => {
                    return i.koatuu.slice(0, 5) == item.attributes.koatuu.slice(0, 5)
                });
                dataR.children.push(obj)
            });
        }

        // console.log('dataR >>', dataR)

        this.state.myParametr[0].features.forEach((item, i) => {
            let obj = {};
            obj.name = item.attributes.name_ua;
            obj.koatuu = item.attributes.koatuu;
            obj.size = (item.attributes[this.state.myItem] == null ) ? 0 : item.attributes[this.state.myItem];
            obj.children = dataR.children.filter(i => {
                return i.koatuu.slice(0, 2) == item.attributes.koatuu.slice(0, 2)
            });
            data.children.push(obj)
        })

        // console.log('data >>', data)

        var m = [60, 160, 80, 230], // top right bottom left
            w = document.documentElement.clientWidth * .5, // width
            h = document.documentElement.clientHeight * .6, // height
            x = d3.scale.linear().range([0, w]),
            y = 18, // bar height
            z = d3.scale.ordinal().range(["#FCCC0E", "rgba(252, 204, 14, 0.5)"]); // bar color

        document.getElementById('diagrama').style.height = ( h + m[0] + m[2] + 70 +'px')

        var hierarchy = d3.layout.partition()
            .sort(function(a, b) { return b.size - a.size; })
            .value(function(d) { return d.size; });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        let diagram = d3.select("#diagrama");

        diagram.append('div')
            .attr("class", 'diagrama_title_wrap')
            .append("div").attr("class", 'diagrama_top')
            .append("div").attr("class", 'diagrama_title')
            .append("p")
            .style('width', w + m[1] + m[3] +'px')
            .text('Рейтинг: ' + document.getElementsByClassName('title_text')[0].innerHTML + ', ' + this.state.myParametr["0"].features["0"].attributes.parameter);


            diagram.append('div')
            .attr("id", 'name_diagram');

        var svg = d3.select("#diagrama").append("svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        svg.append("svg:rect")
            .attr("class", "background")
            .attr("width", w)
            .attr("height", h)
            .on("click", up);

        svg.append("svg:g")
            .attr("class", "x axis");

        svg.append("svg:g")
            .attr("class", "y axis")
            .append("svg:line")
            .attr("y1", "100%");

        hierarchy.nodes(data);
        x.domain([0, data.value]).nice();
        down(data, 0);

        d3.select(".diagrama_top").append("div")
            .attr('class', 'diagrama_button' );

        d3.select(".diagrama_button").append("i")
            .attr('class', 'fa fa-expand ico-opacity' )
            .attr('id', 'max_diagram')
            .attr('aria-hidden', 'true');

        d3.select(".diagrama_button").append("i")
            .attr('class', 'close fa fa-window-close ico-opacity' )
            .attr('id', 'close_diagram')
            .attr('aria-hidden', 'true');

        // d3.select(".diagrama_title").append("span")
        //     .text('Всього: '+ new Intl.NumberFormat().format(data.value) + ' ' + this.state.myParametr["0"].features["0"].attributes.parameter);



        let maximize = document.getElementById('max_diagram').addEventListener('click', () => {

            if (full == false){
                diagram.attr("class", 'diagrama_max');
                full = true;
                w = document.documentElement.clientWidth * 0.8; // width
                h = document.documentElement.clientHeight * 0.95; // height
                x = d3.scale.linear().range([0, w]);
                down(data, 0);
            } else {
                diagram.attr("class", '');
                full = false
                w = document.documentElement.clientWidth * .5; // width
                h = document.documentElement.clientHeight * .6; // height
                x = d3.scale.linear().range([0, w]);
                down(data, 0);
            }

        });



        function down(d, i) {
            if (!d.children) return;

            let name_diagram = document.getElementById('name_diagram')

            if (d.parent) {
                name_diagram.innerHTML = `<div id="back_diagrama"></div> <h6 class="arrow_back">${d.name}</h6>`
            } else {
                name_diagram.innerHTML = `<h6>${d.name}</h6>`;
            }

            if (document.getElementById('back_diagrama')) {
                document.getElementById('back_diagrama').addEventListener('click', function () {
                    up(d)
                })
            }


            // remove dublicate hisogram wrapper
            let gg = document.querySelectorAll('.main')
            if (gg.length > 0) {
                gg[0].remove()
            }

            var duration = d3.event && d3.event.altKey ? 7500 : 750,
                delay = duration / d.children.length;

            // Mark any currently-displayed bars as exiting.
            var exit = svg.selectAll(".enter").attr("class", "exit");

            // Entering nodes immediately obscure the clicked-on bar, so hide it.
            exit.selectAll("rect").filter(function(p) { return p === d; })
                .style("fill-opacity", 1e-6);


            // Enter the new bars for the clicked-on data.
            // Per above, entering bars are immediately visible.
            var enter = bar(d)
                .attr("transform", stack(i))
                .style("opacity", 1);

            // Have the text fade-in, even though the bars are visible.
            // Color the bars as parents; they will fade to children if appropriate.
            enter.select("text").style("fill-opacity", 1e-6);
            enter.select("rect").style("fill", z(true));

            // Update the x-scale domain.
            x.domain([0, d3.max(d.children, function(d) { return d.size; })]).nice();

            // Update the x-axis.
            svg.selectAll(".x.axis").transition()
                .duration(duration)
                .call(xAxis);

            // Transition entering bars to their new position.
            var enterTransition = enter.transition()
                .duration(duration)
                .delay(function(d, i) { return i * delay; })
                .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; });

            // Transition entering text.
            enterTransition.select("text").style("fill-opacity", 1);

            // Transition entering rects to the new x-scale.
            enterTransition.select("rect")
                .attr("width", function(d) { return x(d.size); })
                .style("fill", function(d) { return z(!!d.children); });


            //padding text val from bar
            enterTransition.select(".text_val")
                .attr("x", function(d) { return x(d.size) + 20; });

            // Transition exiting bars to fade out.
            var exitTransition = exit.transition()
                .duration(duration)
                .style("opacity", 1e-6)
                .remove();

            // Transition exiting bars to the new x-scale.
            exitTransition.selectAll("rect").attr("width", function(d) { return x(d.size); });

            // Rebind the current node to the background.
            svg.select(".background").data([d]).transition().duration(duration * 2); d.index = i;
        }

        function up(d) {

            if (!d.parent) return;

            if(d.parent.parent) {
                name_diagram.innerHTML = `<div id="back_diagrama"></div> <h6 class="arrow_back">${d.name}</h6>`
            } else {

                document.getElementById('name_diagram').innerHTML = `<h6>${d.parent.name}</h6>`;
            }


            let gg = document.querySelectorAll('.main')
            if (gg.length > 0) {
                gg[0].remove()
            }
            var duration = d3.event && d3.event.altKey ? 7500 : 750,
                delay = duration / d.children.length;

            // Mark any currently-displayed bars as exiting.
            var exit = svg.selectAll(".enter").attr("class", "exit");

            // Enter the new bars for the clicked-on data's parent.
            var enter = bar(d.parent)
                .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; })
                .style("opacity", 1e-6);

            // Color the bars as appropriate.
            // Exiting nodes will obscure the parent bar, so hide it.
            enter.select("rect")
                .style("fill", function(d) { return z(!!d.children); })
                .filter(function(p) { return p === d; })
                .style("fill-opacity", 1e-6);

            // Update the x-scale domain.
            x.domain([0, d3.max(d.parent.children, function(d) { return d.size; })]).nice();

            // Update the x-axis.
            svg.selectAll(".x.axis").transition()
                .duration(duration * 2)
                .call(xAxis);

            // Transition entering bars to fade in over the full duration.
            var enterTransition = enter.transition()
                .duration(duration * 2)
                .style("opacity", 1);

            // Transition entering rects to the new x-scale.
            // When the entering parent rect is done, make it visible!
            enterTransition.select("rect")
                .attr("width", function(d) { return x(d.size); })
                .each("end", function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

            //padding text val from bar
            enterTransition.select(".text_val")
                .attr("x", function(d) { return x(d.size) + 20; });

            // Transition exiting bars to the parent's position.
            var exitTransition = exit.selectAll("g").transition()
                .duration(duration)
                .delay(function(d, i) { return i * delay; })
                .attr("transform", stack(d.index));

            // Transition exiting text to fade out.
            exitTransition.select("text")
                .style("fill-opacity", 1e-6);

            // Transition exiting rects to the new scale and fade to parent color.
            exitTransition.select("rect")
                .attr("width", function(d) { return x(d.size); })
                .style("fill", z(true));

            // Remove exiting nodes when the last child has finished transitioning.
            exit.transition().duration(duration * 2).remove();

            // Rebind the current parent to the background.
            svg.select(".background").data([d.parent]).transition().duration(duration * 2);
        }

// Creates a set of bars for the given data node, at the specified index.
        function bar(d) {
            var number = 3500;

            let i = 0;
            var bar = svg.insert("svg:g", ".y.axis")
                .attr("transform", "translate(0,5)")
                .attr("class", "main")
                .selectAll("g")
                .data(d.children)
                .enter().append("svg:g")
                .style("cursor", function(d) { return !d.children ? null : "pointer"; })
                .attr("class", function(d) { return !d.children ? 'enter' : "enter active"; })
                .on("click", down);

            bar.append("svg:text")
                .attr("x", -6)
                .attr("y", y / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .text(function(d) {i++; return d.name + '  ('+i+")"; });

            bar.append("svg:rect")
                .attr("width", function(d) {return x(d.size); })
                .attr("height", y);

            // text after bar
            bar.append("svg:text")
                .attr("class", "text_val")
                .attr("x", d => {
                     return (x(d.size))
                })
                .attr("y", y / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .text(function(d) { return (d.size != 0) ? new Intl.NumberFormat().format(d.size) : 'Дані уточнюються'; });

            document.querySelector('#diagrama svg').setAttribute('height', bar[0].length * 24);
            // document.querySelector('#diagrama').style.minHeight =  bar[0].length * 24  + 40 + 'px';
            return bar;
        }

// A stateful closure for stacking bars horizontally.
        function stack(i) {
            var x0 = 0;
            return function(d) {
                var tx = "translate(" + x0 + "," + y * i * 1.2 + ")";
                x0 += x(d.size);
                return tx;
            };
        }

    }

    removeHistogram() {
        let el = document.querySelector('#diagrama')
        if (el) {
            el.innerHTML = "";
            el.style.cssText = "background-color: none";
        }

    }

    componentWillMount(){
        const _this = this;
        ChengeState = function (newState) {
            if(newState instanceof  Object){
                _this.setState(newState);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.visible) !== JSON.stringify(nextProps.visible))
        {
            this.setState({
                visible: nextProps.visible
            })
        }
    }

    render() {

        return (
            <div>
                {(this.state.visible) ? this.createHistogram() : this.removeHistogram()}
                <div id="diagrama"></div>
            </div>

        );
    }
}

export default Diagrama;
