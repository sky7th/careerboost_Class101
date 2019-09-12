import 'dotenv/config';
import App from './app';
import TodosController from './todos/todos.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [
        new TodosController(),
    ],
);

app.listen();