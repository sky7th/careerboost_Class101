import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import TodoNotFoundException from '../exceptions/TodoNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import Todo from './todo.interface';
import TodoModel from './todo.model';
import CreateTodoDto from './todo.dto';

class TodosController implements Controller {
    public path = '/todos';
    public router = express.Router();
    private todo = TodoModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/byUser/:id`, this.getAllTodosByUser);
        this.router.get(`${this.path}/:id`, this.getTodoById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .delete(`${this.path}/:id`, this.deleteTodo)
            .patch(`${this.path}/:id`, validationMiddleware(CreateTodoDto, true), this.modifyTodo)
            .post(this.path, authMiddleware, validationMiddleware(CreateTodoDto), this.createTodo);
    }

    private getAllTodosByUser = async (request: express.Request, response: express.Response) => {
        const userId = request.params.id;
        const todos = await this.todo.find({ author: userId })
            .populate('author', '-password');
        response.send(todos);
    }

    private getTodoById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const todo = await this.todo.findById(id)
        if (todo) {
            response.send(todo);
        } else {
            next(new TodoNotFoundException(id));
        }
    }

    private modifyTodo = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const todoData: Todo = request.body;
        const todo = await this.todo.findByIdAndUpdate(id, todoData, { new: true })
        if (todo) {
            response.send(todo);
        } else {
            next(new TodoNotFoundException(id));
        }
    }

    private createTodo = async (request: RequestWithUser, response: express.Response) => {
        const todoData: CreateTodoDto = request.body;
        console.log(todoData);
        const createdTodo = new this.todo({
            ...todoData,
            author: request.user._id
        });
        const savedTodo = await createdTodo.save();
        await savedTodo.populate('author', '-password').execPopulate();
        response.send(savedTodo);
    }

    private deleteTodo = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        console.log(id);
        const successResponse = await this.todo.findByIdAndDelete(id);
        if (successResponse) {
            response.send(200);
        } else {
            next(new TodoNotFoundException(id));
        }
    }
}

export default TodosController;