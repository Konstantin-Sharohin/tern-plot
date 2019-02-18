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
                a = $("[name=a]").val(),
                b = $("[name=b]").val(),
                c = $("[name=c]").val(),
                t = $("[name=t]").val(),
                inputRange = $("[name=range]").val(),
                inputIterations = $("[name=iterations]").val(),
                inputLimitation = $("[name=limitation]").val(),
                setX = parseFloat(x),
                setY = parseFloat(y),
                setZ = parseFloat(z),
                setA = parseFloat(a),
                setB = parseFloat(b),
                setC = parseFloat(c),
                setT = parseFloat(t),
                range = (parseFloat(inputRange)) / 100,
                setIterations = parseFloat(inputIterations),
                limitation = parseFloat(inputLimitation);
                console.log(setA);

                let replacedFormula = inputFormula.replace(/x/gi, setX);
                replacedFormula = replacedFormula.replace(/y/gi, setY);
                replacedFormula = replacedFormula.replace(/z/gi, setZ);
                replacedFormula = replacedFormula.replace(/a/gi, setA);
                replacedFormula = replacedFormula.replace(/b/gi, setB);
                replacedFormula = replacedFormula.replace(/c/gi, setC);
                replacedFormula = replacedFormula.replace(/(?<=\W+)t/gi, setT);
                replacedFormula = replacedFormula.replace(/EXP/gi, '^');
                console.log(replacedFormula);

            generator(replacedFormula, setX, setY, setZ, setIterations, range, limitation, generate, dataBase);

            ternaryPlot('#plot', plot_opts).data(dataBase, function (d) { return [d.x, d.y, d.z] }, 'label');

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
