import express from 'express';
import { SERVER_PORT } from '../global/environment';
import router from '../routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

export default class Server {
    private port: number;
    private app: express.Application;

    constructor() {
        this.port = SERVER_PORT;
        this.app = express();
    }

    /**
     * Method that start server
     * @param callback Execute when server starts
     */
    public start(callback: Function){
        this.app.listen(this.port, () => callback(this.port));
        this.configCors();
        this.configRoutes();
    }

    /**
     * Configuration of CORS
     */
    private configCors() {
        this.app.use(cors( { origin: true, credentials: true } ));
    }

    /**
     * Configuration of routes
     */
    private configRoutes() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(router);
    }
}