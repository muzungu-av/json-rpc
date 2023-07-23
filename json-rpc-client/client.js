const axios = require("axios");

const data = {
    jsonrpc: "2.0",
    id: 0,
    method: "+",
    params: [1,11]    
};

(async () => {
    const response = await axios.post(`http://localhost:8080/json-rpc`, data)
    console.log(response.data)
})();  