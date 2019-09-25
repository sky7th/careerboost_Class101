import UserData from '../user/UserData';
import CreateTodoData from './CreateTodoData';

export default interface TodoData extends CreateTodoData {
  _id: string;
  author: UserData;
  isCompleted: boolean;
}
