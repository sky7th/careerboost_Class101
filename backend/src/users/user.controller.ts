import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import todoModel from '../todos/todo.model';

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private todo = todoModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id/todos`, authMiddleware, this.getAllTodosOfUser);
    }

    private getAllTodosOfUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
        const userId = request.params.id;
        if (userId === request.user._id.toString()) {
            const todos = await this.todo.find({ author: userId });
            response.send(todos);
        }
        next(new NotAuthorizedException());
    }
}

export default UserController;