import 'dotenv/config';
import App from './app';
import TodosController from './todos/todo.controller';
import validateEnv from './utils/validateEnv';
import AuthenticationController from './authentication/authentication.controller';

validateEnv();

const app = new App(
    [
        new TodosController(),
        new AuthenticationController()
    ],
);

app.listen();