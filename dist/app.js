"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.express = express();
        this.middleWares();
        this.mountRoutes();
    }
    middleWares() {
        this.express.use(cors());
        this.express.use(bodyParser.json());
    }
    mountRoutes() {
        const router = express.Router();
        router.post('/api/v1/parse', (req, res) => {
            let reqData = req.body.data;
            var pattern = /(([A-Za-z]+[\d]+)+([A-Za-z]+0+)+([\1-9]+))/;
            reqData = pattern.exec(reqData);
            let result = {
                statusCode: 200,
                data: {
                    firstName: reqData[2],
                    lastName: reqData[3],
                    clientId: reqData[4]
                }
            };
            res.json(result);
        });
        router.post('/api/v2/parse', (req, res) => {
            let reqData = req.body.data;
            var pattern = /(([A-Za-z]+)+[\d]+([A-Za-z]+)+0+([\1-9]+))/;
            reqData = pattern.exec(reqData);
            let result = {
                statusCode: 200,
                data: {
                    firstName: reqData[2],
                    lastName: reqData[3],
                    clientId: reqData[4].replace(/\B(?=(\d{4})+(?!\d))/g, "-")
                }
            };
            res.json(result);
        });
        router.get('/', (req, res) => {
            res.send('');
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map