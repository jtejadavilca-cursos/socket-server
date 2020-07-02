import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import router from '../routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    private port: number;
    private app: express.Application;
    private io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.port = SERVER_PORT;
        this.app = express();

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets() {
        console.log('Escuchando sockets...');

        this.io.on('connection', client => {
            console.log('Cliente conectado');

            socket.mensaje(client, this.io);
            socket.desconectar(client);
    
        });
    }

    /**
     * Method that start server
     * @param callback Execute when server starts
     */
    public start(callback: Function){
        // this.app.listen(this.port, () => callback(this.port));
        this.httpServer.listen(this.port, () => callback(this.port));
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