import * as express from 'express';
import CategoryNameAlreadyExistsException from '../exceptions/CategoryNameAlreadyExistsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import Category from './category.interface';
import CategoryModel from './category.model';
import CreateCategoryDto from './category.dto';

class CategoryController implements Controller {
    public path = '/categories';
    public router = express.Router();
    private category = CategoryModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllCategories);
        this.router.post(this.path, authMiddleware, validationMiddleware(CreateCategoryDto), this.createCategory);
    }

    private getAllCategories = async (request: express.Request, response: express.Response) => {
        const categories = await this.category.aggregate([
            { $lookup: {
                    from: "todos",
                    localField: "name",
                    foreignField: "category",
                    as: "todos"
                }
            },
            { $project: {
                    _id: 0,
                    name: "$name",
                    countOfTodos: { $size: "$todos" }
                } 
            }
        ]);
        response.send(categories);
    }

    private createCategory = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const categoryData: CreateCategoryDto = request.body;
        console.log(categoryData);
        if (
            await this.category.findOne({ name: categoryData.name })
        ) {
            next(new CategoryNameAlreadyExistsException(categoryData.name));
        } else {
            const category = await this.category.create({
                ...categoryData
            });
            response.send(category);
        }
    }
}

export default CategoryController;