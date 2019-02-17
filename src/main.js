(function (window) {

    const App = window.App,
        generator = App.generator,
        ternaryPlot = App.ternaryPlot,
        plot_opts = App.plot_opts;

    $(window).on("load", function () {

        let btn = $("#countForm"),
            generate = $("#generate"),
            dataBase = [];

        btn.on("click", function (event) {
            event.preventDefault();
            d3.select("#plot").select("svg").remove();
            dataBase.length = 0;
            $(".generated").remove(),
                $(".button-default").remove();

            let inputFormula = $("[name=formula]").val(),
                x = $("[name=lambda1]").val(),
                y = $("[name=lambda2]").val(),
                z = $("[name=lambda3]").val(),
                inputLambdaRange = $("[name=lambdaRange]").val(),
                inputIterations = $("[name=iterations]").val(),
                setX = parseFloat(x),
                setY = parseFloat(y),
                setZ = parseFloat(z),
                lambdaRange = (parseFloat(inputLambdaRange)) / 100,
                setIterations = parseFloat(inputIterations);

                replacedFormula = inputFormula.replace(/x y z/gi, x)
                re = /яблоки/gi;
                str = 'Яблоки круглые и яблоки сочные.';
                newstr = str.replace(re, 'апельсины');
            //Big(setLambda1);
            //Big(setLambda2);
            //Big(setLambda3);

            generator(inputFormula, setX, setY, setZ, setIterations, lambdaRange, generate, dataBase);

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
