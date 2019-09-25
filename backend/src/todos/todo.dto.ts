import { IsString, IsBoolean } from 'class-validator';

class CreateTodoDto {
    @IsString()
    public content: string;

    @IsString()
    public title: string;

    @IsBoolean()
    public isCompleted: boolean;

    @IsString()
    public category: string;
}

export default CreateTodoDto;