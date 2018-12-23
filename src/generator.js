(function (window) {

    const App = window.App || {};

    function generator(setIterations, rndNumber1, lambdaMin, setLambda1, rndNumber2, setLambda2, rndNumber3, setLambda3, func, a1, t, a2, a3, generate, dataBase) {

        for (let i = 0; i < setIterations; i++) {
            rndNumber1 = math.random(lambdaMin, setLambda1);
            Big(rndNumber1);
            for (let j = 0; j < 1; j++) {
                rndNumber2 = math.random(lambdaMin, setLambda2);
                Big(rndNumber2);
                for (let k = 0; k < 1; k++) {
                    rndNumber3 = math.random(lambdaMin, setLambda3);
                    Big(rndNumber3);
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
        }
        console.log('rndNumber1 ' + rndNumber1 + 'rndNumber2 ' + rndNumber2 + 'rndNumber3 ' + rndNumber3);
    };

    App.generator = generator;
    window.App = App;

})(window);