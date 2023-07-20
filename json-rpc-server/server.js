const express = require("express");
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");

const server = new JSONRPCServer();
server.addMethod("summ", ({ text }) => text);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/json-rpc", (req, res, next) => {
    const jsonRPCRequest = req.body;
    var summ;
    summ = jsonRPCRequest.params[0] + jsonRPCRequest.params[1];
    if (isNaN(summ)) {
        var err = new Error("Проблемма с параметрами");
        next(err);
    } else {
        server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
            if (jsonRPCResponse) {
                jsonRPCResponse.result = summ;
                res.status(200).json(jsonRPCResponse);
            } else {
                res.sendStatus(204);
            }
        });
    }
});

app.use((error, req, res, next) => {
    res.status(400)
    res.json({ message: error.message })
})

app.listen(8080);