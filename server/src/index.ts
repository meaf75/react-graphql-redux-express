import express from 'express';
import database from './database';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes'
import helmet from 'helmet';
import AppEnviroment from './Classes/EnvConfigs';
import Trimmer from './Classes/Trimmer';

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        // app middlewares
        this.app.use(morgan('dev'));
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({limit: '1mb', parameterLimit: 1000, extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

        this.app.use(Trimmer)
    }

    routes(){
        this.app.use(indexRoutes);
    }

    start(){
        this.limpiarConsola(); // Limpio consola

        this.app.listen(AppEnviroment.PORT, () => {        
            console.log('Server is listenning on port: ', AppEnviroment.PORT);
        });

        database.connect();
    }

    limpiarConsola(){ for (let i = 0; i < 30; i++) { console.log('\n'); } }
}

const server = new Server();
server.start();