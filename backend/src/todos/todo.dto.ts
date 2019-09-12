import { IsString } from 'class-validator';

class CreateTodoDto {
    @IsString()
    public author: string;

    @IsString()
    public content: string;

    @IsString()
    public title: string;
}

export default CreateTodoDto;