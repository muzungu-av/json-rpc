const express = require("express");
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");
const { selectOperation, allOperation } = require("./mathOperation");

/*
 * JSONRPCServer, инициализируем его доступными командами из mathOperation.
 */
const server = new JSONRPCServer();
allOperation.map((operation) => {
    server.addMethod(operation, () => { });
})

/* 
 * Promise выполняет выбранное (сгенерированное) математическое выражение.
 * Принимает два аргумента и функцию с выражением, которое будет выполненно.
 */
var calculate = (fn, arg_0, arg_1) => {
    return new Promise((resolve, reject) => {
        resolve(fn(arg_0, arg_1));
    })
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/json-rpc", (req, res, next) => {
    var mathOperation = selectOperation(req.body.method);
    const jsonRPCRequest = req.body;
    let arg_0 = jsonRPCRequest.params[0];
    let arg_1 = jsonRPCRequest.params[1];
    if (!Number.isFinite(arg_0) || !Number.isFinite(arg_1)) {
        throw new Error('Не удалось получить два числовых параметра.')
    }
    calculate(mathOperation, arg_0, arg_1)
        .then((summ) => {
            server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
                if (jsonRPCResponse) {
                    jsonRPCResponse.result = summ;
                    res.status(200).json(jsonRPCResponse);
                } else {
                    res.sendStatus(204);
                }
            });
        })
        .catch(next) //обработает express
});

/* обработка ошибок */
app.use((error, req, res, next) => {
    res.status(400)
    res.json({ message: "ОШИБКА: " + error.message })
})

app.listen(8080);