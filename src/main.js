(function (window) {

    const App = window.App,
        generator = App.generator,
        ternaryPlot = App.ternaryPlot,
        plot_opts = App.plot_opts;

    $(window).on("load", function () {

        let btn = $("#countFormButton"),
            generate = $("#generate"),
            dataBase = [];

        btn.on("click", function (event) {
            event.preventDefault();
            d3.select("#plot").select("svg").remove();
            dataBase.length = 0;
            $(".generated").remove(),
                $(".button-default").remove();

            let inputFormula = $("[name=formula]").val(),
                x = $("[name=x]").val(),
                y = $("[name=y]").val(),
                z = $("[name=z]").val(),
                inputLambdaRange = $("[name=range]").val(),
                inputIterations = $("[name=iterations]").val(),
                inputLimitation = $("[name=limitation]").val(),
                setX = parseFloat(x),
                setY = parseFloat(y),
                setZ = parseFloat(z),
                lambdaRange = (parseFloat(inputLambdaRange)) / 100,
                setIterations = parseFloat(inputIterations),
                limitation = parseFloat(inputLimitation);

                let replacedFormula = inputFormula.replace(/(?<=\W+)x(?=\W+)/gi, x);
                console.log(replacedFormula);
                replacedFormula = replacedFormula.replace(/(?<=\W+)y(?=\W+)/gi, y);
                console.log(replacedFormula);
                replacedFormula = replacedFormula.replace(/(?<=\W+)z(?=\W+)/gi, z);
                console.log(replacedFormula);
                replacedFormula = replacedFormula.replace(/EXP/gi, '^');
            //Big(setLambda1);
            //Big(setLambda2);
            //Big(setLambda3);

            generator(replacedFormula, setX, setY, setZ, setIterations, lambdaRange, limitation, generate, dataBase);

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
