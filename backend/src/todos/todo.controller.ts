import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import TodoNotFoundException from '../exceptions/TodoNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import Todo from './todo.interface';
import todoModel from './todo.model';
import CreateTodoDto from './todo.dto';

class TodosController implements Controller {
    public path = '/todos';
    public router = express.Router();
    private todo = todoModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllTodos);
        this.router.get(`${this.path}/:id`, this.getTodoById);
        this.router.put(`${this.path}/:id`, this.modifyTodo);
        this.router.delete(`${this.path}/:id`, this.deleteTodo);
        this.router.patch(`${this.path}/:id`, validationMiddleware(CreateTodoDto, true), this.modifyTodo);
        this.router.post(this.path, validationMiddleware(CreateTodoDto), this.createTodo);
    }

    private getAllTodos = (request: express.Request, response: express.Response) => {
        this.todo.find()
            .then((todos) => {
                response.send(todos);
            });
    }

    private getTodoById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.todo.findById(id)
            .then((todo) => {
                if (todo) {
                    response.send(todo);
                } else {
                    next(new TodoNotFoundException(id));
                }
            });
    }

    private modifyTodo = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const todoData: Todo = request.body;
        this.todo.findByIdAndUpdate(id, todoData, { new: true })
            .then((todo) => {
                if (todo) {
                    response.send(todo);
                } else {
                    next(new TodoNotFoundException(id));
                }
            });
    }

    private createTodo = (request: express.Request, response: express.Response) => {
        const todoData: Todo = request.body;
        const createdTodo = new this.todo(todoData);
        createdTodo.save()
            .then((savedTodo) => {
                response.send(savedTodo);
            });
    }

    private deleteTodo = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.todo.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                } else {
                    next(new TodoNotFoundException(id));
                }
            });
    }
}

export default TodosController;