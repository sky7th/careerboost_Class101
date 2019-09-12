import { IsString } from 'class-validator';

class CreateTodoDto {
    @IsString()
    public content: string;

    @IsString()
    public title: string;
}

export default CreateTodoDto;