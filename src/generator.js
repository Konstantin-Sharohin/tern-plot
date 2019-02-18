(function (window) {

    const App = window.App || {};

    function generator(replacedFormula, setX, setY, setZ, setIterations, lambdaRange, limitation, generate, dataBase) {

        let range1 = setX * lambdaRange,
            XMin = setX - range1,
            XMax = setX + range1;

        let range2 = setY * lambdaRange,
            YMin = setY - range2,
            YMax = setY + range2;

        let range3 = setZ * lambdaRange,
            ZMin = setZ - range3,
            ZMax = setZ + range3;

        let func;

        for (let i = 0; i < setIterations; i++) {
            x = math.random(XMin, XMax);

            for (let j = 0; j < 1; j++) {
                y = math.random(YMin, YMax);

                for (let k = 0; k < 1; k++) {
                    z = math.random(ZMin, ZMax);

                    func = replacedFormula;
                    let calculated = math.eval(func);
                    console.log('calculated: ' + calculated);
                    if (calculated > limitation) {

                        let newRow1 = "<tr class='generated'>" + "<td>" +
                        x + "</td>" +
                            "<td>" + y +
                            "</td>" +
                            "<td>" +
                            z + "</td>" + "<td>" + calculated + "</td>" +
                            "</tr>";
                        generate.after(newRow1);
                        dataBase.push({
                            "lambda1": x,
                            "lambda2": y,
                            "lambda3": z,
                            "label": "point" + i
                        });
                   }
                }
            }
        }
    };

    App.generator = generator;
    window.App = App;

})(window);