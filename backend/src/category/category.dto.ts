import { IsString } from 'class-validator';
import Todo from '../todos/todo.interface'

class CreateCategoryDto {
    @IsString()
    public name: string;
}

export default CreateCategoryDto;