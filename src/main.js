$(window).on("load", function () {

    let btn = $("#countForm"),
        generate = $("#generate"),
        dataBase = [],
        func;

    btn.on("click", function (event) {
        event.preventDefault();
        d3.select("#plot").select("svg").remove();
        dataBase.length = 0;
        $(".generated").remove();

        let inputL1 = $("[name=lambda1]").val(),
            inputL2 = $("[name=lambda2]").val(),
            inputL3 = $("[name=lambda3]").val(),
            inputA1 = $("[name=a1]").val(),
            inputA2 = $("[name=a2]").val(),
            inputA3 = $("[name=a3]").val(),
            inputT = $("[name=t]").val(),
            inputLambdaMin = $("[name=lambdaRange]").val(),
            setLambda1 = parseFloat(inputL1),
            setLambda2 = parseFloat(inputL2),
            setLambda3 = parseFloat(inputL3),
            a1 = parseFloat(inputA1),
            a2 = parseFloat(inputA2),
            a3 = parseFloat(inputA3),
            t = parseFloat(inputT),
            lambdaMin = parseFloat(inputLambdaMin),
            rndNumber1, rndNumber2, rndNumber3;

        for (let i = 0; i < 1000; i++) {
            rndNumber1 = math.random(lambdaMin, setLambda1);
            for (let j = 0; j < 1; j++) {
                rndNumber2 = math.random(lambdaMin, setLambda2);
                for (let k = 0; k < 1; k++) {
                    rndNumber3 = math.random(lambdaMin, setLambda3);
                    func = a1 * math.exp(-rndNumber1 * t) + a2 * math.exp(-rndNumber2 * t) + a3 * math.exp(-rndNumber3 * t);
                    let calculated = math.eval(func);
                    if ((calculated > 0) && (calculated < 1e-10)) {
                        let newRow1 = "<tr class='generated'>" + "<td>" +
                            rndNumber1 + "</td>" +
                            "<td>" + rndNumber2 +
                            "</td>" +
                            "<td>" +
                            rndNumber3 + "</td>" + "<td>" + calculated + "</td>" +
                            "</tr>";
                        generate.after(newRow1);
                        dataBase.push({
                            "lambda1": rndNumber1,
                            "lambda2": rndNumber2,
                            "lambda3": rndNumber3,
                            "label": "point" + i
                        });
                    }
                }
            }
        };

        function ternaryPlot(selector, userOpt) {
            let plot = {
                dataset: []
            };

            let opt = {
                width: 700,
                height: 700,
                side: 700,
                margin: {
                    top: 10,
                    left: 10,
                    bottom: 10,
                    right: 10
                },
                axis_labels: ['A', 'B', 'C'],
                axis_ticks: [-50, -30, -10, 0, 10, 30, 50],
                tickLabelMargin: 10,
                axisLabelMargin: 40
            };

            for (let o in userOpt) {
                opt[o] = userOpt[o];
            }

            let svg = d3.select(selector).append('svg')
                .attr("width", opt.width)
                .attr("height", opt.height);

            let axes = svg.append('g').attr('class', 'axes');

            let w = opt.side;
            let h = Math.sqrt(opt.side * opt.side - (opt.side / 2) * (opt.side / 2));

            let corners = [
                [opt.margin.left, h + opt.margin.top], // a
                [w + opt.margin.left, h + opt.margin.top], //b 
                [(w / 2) + opt.margin.left, opt.margin.top]
            ]; //c

            //axis names
            axes.selectAll('.axis-title')
                .data(opt.axis_labels)
                .enter()
                .append('g')
                .attr('class', 'axis-title')
                .attr('transform', function (d, i) {
                    return 'translate(' + corners[i][0] + ',' + corners[i][1] + ')';
                })
                .append('text')
                .text(function (d) {
                    return d;
                })
                .attr('text-anchor', function (d, i) {
                    if (i === 0) return 'end';
                    if (i === 2) return 'middle';
                    return 'start';

                })
                .attr('transform', function (d, i) {
                    let theta = 0;
                    if (i === 0) theta = 120;
                    if (i === 1) theta = 60;
                    if (i === 2) theta = -90;

                    let x = opt.axisLabelMargin * Math.cos(theta * 0.0174532925),
                        y = opt.axisLabelMargin * Math.sin(theta * 0.0174532925);
                    return 'translate(' + x + ',' + y + ')';
                });

            //ticks

            if (opt.minor_axis_ticks) {
                opt.minor_axis_ticks.forEach(function (v) {
                    let coord1 = coord([v, -50, 0 - v]);
                    let coord2 = coord([v, 0 - v, -50]);
                    let coord3 = coord([-50, 0 - v, v]);
                    let coord4 = coord([0 - v, -50, v]);
                    
                    axes.append("line")
                        .attr(lineAttributes(coord1, coord2))
                        .classed('a-axis minor-tick', true);

                    axes.append("line")
                        .attr(lineAttributes(coord2, coord3))
                        .classed('b-axis minor-tick', true);

                    axes.append("line")
                        .attr(lineAttributes(coord3, coord4))
                        .classed('c-axis minor-tick', true);
                });
            }

            opt.axis_ticks.forEach(function (v) {
                let coord1 = coord([v, -50, 0 - v]);
                let coord2 = coord([v, 0 - v, -50]);
                let coord3 = coord([-50, 0 - v, v]);
                let coord4 = coord([0 - v, -50, v]);
                
                axes.append("line")
                    .attr(lineAttributes(coord1, coord2))
                    .classed('a-axis tick', true);

                axes.append("line")
                    .attr(lineAttributes(coord2, coord3))
                    .classed('b-axis tick', true);

                axes.append("line")
                    .attr(lineAttributes(coord3, coord4))
                    .classed('c-axis tick', true);

                //tick labels
                axes.append('g')
                    .attr('transform', function (d) {
                        return 'translate(' + coord1[0] + ',' + coord1[1] + ')';
                    })
                    .append("text")
                    .attr('transform', 'rotate(60)')
                    .attr('text-anchor', 'end')
                    .attr('x', -opt.tickLabelMargin)
                    .text(function (d) {
                        return v;
                    })
                    .classed('a-axis tick-text', true);

                axes.append('g')
                    .attr('transform', function (d) {
                        return 'translate(' + coord2[0] + ',' + coord2[1] + ')';
                    })
                    .append("text")
                    .attr('transform', 'rotate(-60)')
                    .attr('text-anchor', 'end')
                    .attr('x', -opt.tickLabelMargin)
                    .text(function (d) {
                        return (0 - v);
                    })
                    .classed('b-axis tick-text', true);

                axes.append('g')
                    .attr('transform', function (d) {
                        return 'translate(' + coord3[0] + ',' + coord3[1] + ')';
                    })
                    .append("text")
                    .text(function (d) {
                        return v;
                    })
                    .attr('x', opt.tickLabelMargin)
                    .classed('c-axis tick-text', true);
            });

            function lineAttributes(p1, p2) {
                return {
                    x1: p1[0],
                    y1: p1[1],
                    x2: p2[0],
                    y2: p2[1]
                };
            }

            function coord(arr) {
                let a = arr[0],
                    b = arr[1],
                    c = arr[2];
                let sum, pos = [0, 0];
                sum = a + b + c;
                if (sum !== 0) {
                    a /= sum;
                    b /= sum;
                    c /= sum;
                    pos[0] = corners[0][0] * a + corners[1][0] * b + corners[2][0] * c;
                    pos[1] = corners[0][1] * a + corners[1][1] * b + corners[2][1] * c;
                }
                return pos;
                
            }

            plot.data = function (data, accessor, bindBy) { //bind by is the dataset property used as an id for the join
                plot.dataset = data;
                console.log('data: ' + data);
                let circles = svg.selectAll("circle")
                    .data(data.map(function (d) {
                        
                        return coord(accessor(d));
                    }), function (d, i) {
                        if (bindBy) {
                            return plot.dataset[i][bindBy];
                        }
                        return i;
                    });

                circles.enter().append("circle");

                circles.transition().attr("cx", function (d) {
                    
                    return d[0];
                })
                    .attr("cy", function (d) {
                        
                        return d[1];
                    })
                    .attr("r", 5);
                    
                return this;
            };

            plot.getPosition = coord;
            plot.getTripple = function (x, y) {
                //TODO, get percentages for a give x, y
            }
            return plot;
        };


        //ACTIVATE
        let plot_opts = {
            side: 300,
            margin: {
                top: 100,
                left: 200,
                bottom: 10,
                right: 50
            },
            axis_labels: ['lambda1', 'lambda2', 'lambda3'],
            axis_ticks: d3.range(-50, 51, 10),
            minor_axis_ticks: d3.range(-50, 51, 5)
        };

        ternaryPlot('#plot', plot_opts).data(dataBase, function (d) { return [d.lambda1, d.lambda2, d.lambda3, d.label]}, 'label' );
        
        event.stopPropagation();
    });
});