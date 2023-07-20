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
        server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
            if (jsonRPCResponse) {
                jsonRPCResponse.result = summ;
                res.status(200).json(jsonRPCResponse);
            } else {
                res.sendStatus(204);
            }
        });

});

app.listen(8080);