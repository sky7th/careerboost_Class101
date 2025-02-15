import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(function(req, res, next) {
          res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:3000');
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
          res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Cookie, Authorization"
          );
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          next();
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}

export default App;