(function(window){

    const App = window.App,
    generator = App.generator,
    ternaryPlot = App.ternaryPlot,
    plot_opts = App.plot_opts;

    $(window).on("load", function () {

        let btn = $("#countForm"),
            generate = $("#generate"),
            dataBase = [],
            inputDataCollection = [],
            func;
    
            btn.on("click", function (event) {
                event.preventDefault();
                d3.select("#plot").select("svg").remove();
                dataBase.length = 0;
                inputDataCollection.length = 0;
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
                    inputDataCollection.push();
        
                generator(setIterations, rndNumber1, lambdaMin, setLambda1, rndNumber2, setLambda2, rndNumber3, setLambda3, func, a1, t, a2, a3, generate, dataBase);
        
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
    