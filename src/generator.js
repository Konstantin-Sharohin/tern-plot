(function (window) {

    const App = window.App || {};

    function generator(setIterations, rndNumber1, lambdaRange, setLambda1, rndNumber2, setLambda2, rndNumber3, setLambda3, func, a1, t, a2, a3, generate, dataBase) {

        let range1 = setLambda1 * lambdaRange,
            lambda1Min = setLambda1 - range1,
            lambda1Max = setLambda1 + range1;

        let range2 = setLambda2 * lambdaRange,
            lambda2Min = setLambda2 - range2,
            lambda2Max = setLambda2 + range2;

        let range3 = setLambda3 * lambdaRange,
            lambda3Min = setLambda3 - range3,
            lambda3Max = setLambda3 + range3;

        for (let i = 0; i < setIterations; i++) {
            rndNumber1 = math.random(lambda1Min, lambda1Max);
            Big(rndNumber1);
            for (let j = 0; j < 1; j++) {
                rndNumber2 = math.random(lambda2Min, lambda2Max);
                Big(rndNumber2);
                for (let k = 0; k < 1; k++) {
                    rndNumber3 = math.random(lambda3Min, lambda3Max);
                    Big(rndNumber3);
                    func = a1 * math.exp(-rndNumber1 * t) - a2 * math.exp(-rndNumber2 * t) + a3 * math.exp(-rndNumber3 * t);
                    let calculated = math.eval(func);
                    console.log('calculated: ' + calculated);
                    if (calculated > 0) {
                    
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
        }
        console.log('lambda1Min: ' + lambda1Min + 'rndNumber1: ' + rndNumber1 + 'rndNumber2: ' + rndNumber2 + 'rndNumber3: ' + rndNumber3);
    };

    App.generator = generator;
    window.App = App;

})(window);