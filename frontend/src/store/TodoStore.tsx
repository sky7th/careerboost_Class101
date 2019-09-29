import TodoData from '../interfaces/todo/TodoData';
import { observable, computed, action } from 'mobx';
import { fetchTodos, addTodoApi, deleteTodoApi } from '../api/todos';
import UserData from '../interfaces/user/UserData';
import CreateTodoData from '../interfaces/todo/CreateTodoData';

export type TodosView = 'all' | 'completed' | 'pending';

export const views: TodosView[] = ['all', 'completed', 'pending'];

export default class TodoStore {
  @observable public todos: TodoData[];
  @observable public view: TodosView;

  constructor() {
    this.todos = [];
    this.view = 'all';
  }

  @computed get completedTodos(): TodoData[] {
    return this.todos.filter((todo: TodoData) => todo.isCompleted);
  }

  @computed get pendingTodos(): TodoData[] {
    return this.todos.filter((todo: TodoData) => !todo.isCompleted);
  }

  @computed get completedCount(): number {
    return this.completedTodos.length;
  }

  @computed get visibleTodos(): TodoData[] {
    switch (this.view) {
      case 'all': return this.todos;
      case 'completed': return this.completedTodos;
      case 'pending': return this.pendingTodos;
      default: throw new Error('type is `never` here, but have to return or throw');
    }
  }
  @action
  public getTodo = async (loginUser: UserData) => {
    this.todos = await fetchTodos(loginUser);
  }
  @action
  public addTodo = async (createTodoData: CreateTodoData) => {
    if (!createTodoData.title) {
      return;
    }
    await addTodoApi(createTodoData);
  }
  @action
  public deleteTodo = async (todoId: string) => {
    await deleteTodoApi(todoId);
  }

  public setViewAction = (view: TodosView): void => {
    this.view = view;
  }
}
