import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { IData } from './model/IData';

class App {
  public express;

  constructor () {
    this.express = express();
    this.middleWares();
    this.mountRoutes();
  }

  //Middlewares
  middleWares (): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
  }

  //App routing
  mountRoutes (): void {
    const router = express.Router();

	//V1 Api Request
    router.post('/api/v1/parse', (req, res) => {
        let reqData = req.body.data;
        var pattern = /(([A-Za-z]+[\d]+)+([A-Za-z]+0+)+([\1-9]+))/;
        reqData = pattern.exec(reqData); 

        let result: IData = <IData> {
            statusCode: 200,
            data: {
                firstName: reqData[2],
                lastName: reqData[3],
                clientId: reqData[4]
            }
        }
        res.json(result);
    });

	//V2 Api Request
    router.post('/api/v2/parse', (req, res) => {
        let reqData = req.body.data;
        var pattern = /(([A-Za-z]+)+[\d]+([A-Za-z]+)+0+([\1-9]+))/;
        reqData = pattern.exec(reqData); 

        let result: IData = <IData> {
            statusCode: 200,
            data: {
                firstName: reqData[2],
                lastName: reqData[3],
                clientId: reqData[4].replace(/\B(?=(\d{4})+(?!\d))/g, "-")
            }
        }
        res.json(result);
    });

    router.get('/', (req, res) => {
      res.send('');
    });

    this.express.use('/', router);
  }

}

export default new App().express;