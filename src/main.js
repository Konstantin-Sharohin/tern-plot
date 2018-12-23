(function(window){

    const App = window.App,
    ternaryPlot = App.ternaryPlot,
    plot_opts = App.plot_opts;

    $(window).on("load", function () {

        let btn = $("#countForm"),
            generate = $("#generate"),
            dataBase = [],
            func;
    
        btn.on("click", function (event) {
            event.preventDefault();
            d3.select("#plot").select("svg").remove();
            dataBase.length = 0;
            $(".generated").remove(),
            $(".button-default").remove();
    
            let inputL1 = $("[name=lambda1]").val(),
                inputL2 = $("[name=lambda2]").val(),
                inputL3 = $("[name=lambda3]").val(),
                inputA1 = $("[name=a1]").val(),
                inputA2 = $("[name=a2]").val(),
                inputA3 = $("[name=a3]").val(),
                inputT = $("[name=t]").val(),
                inputLambdaMin = $("[name=lambdaRange]").val(),
                inputIterations = $("[name=iterations]").val(),
                setLambda1 = parseFloat(inputL1),
                setLambda2 = parseFloat(inputL2),
                setLambda3 = parseFloat(inputL3),
                a1 = parseFloat(inputA1),
                a2 = parseFloat(inputA2),
                a3 = parseFloat(inputA3),
                t = parseFloat(inputT),
                lambdaMin = parseFloat(inputLambdaMin),
                setIterations = parseFloat(inputIterations),
                rndNumber1, rndNumber2, rndNumber3;
    
            for (let i = 0; i < setIterations; i++) {
                rndNumber1 = math.random(lambdaMin, setLambda1);
                for (let j = 0; j < 1; j++) {
                    rndNumber2 = math.random(lambdaMin, setLambda2);
                    for (let k = 0; k < 1; k++) {
                        rndNumber3 = math.random(lambdaMin, setLambda3);
                        func = a1 * math.exp(-rndNumber1 * t) + a2 * math.exp(-rndNumber2 * t) + a3 * math.exp(-rndNumber3 * t);
                        let calculated = math.eval(func);
                        if ((calculated > 0) && (calculated < 1e-11)) {
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
    
            ternaryPlot('#plot', plot_opts).data(dataBase, function (d) { return [d.lambda1, d.lambda2, d.lambda3] }, 'label');
    
            event.stopPropagation();
    
            $(result).tableExport({
                headers: true,
                footers: true,
                formats: ['xlsx', 'csv', 'txt'],
                filename: 'id',
                bootstrap: false,
                position: 'bottom',
                ignoreRows: null,
                ignoreCols: null,
                ignoreCSS: '.tableexport-ignore',
                emptyCSS: '.tableexport-empty',
                trimWhitespace: false
            });
    
        });
    
    });

})(window);
    