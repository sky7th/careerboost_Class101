import TodoData from '../interfaces/todo/TodoData';
import {observable, computed, action} from 'mobx';

export type TodosView = 'all' | 'completed' | 'pending';

export const views: TodosView[] = ['all', 'completed', 'pending'];

export default class TodoStore {
  @observable todos: TodoData[] = DEFAULT_TODOS;
  @observable newTodoText = '';
  @observable view: TodosView = 'all';

  @computed get completedTodos(): TodoData[] {
    return this.todos.filter((todo) => todo.isComplete);
  }

  @computed get pendingTodos(): TodoData[] {
    return this.todos.filter((todo) => !todo.isComplete);
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

  @action addTodoAction = (text: string): void => {
    if (!text) {
      return;
    }
    this.todos.push(new TodoData(text));
    this.newTodoText = '';
  };

  @action removeTodoAction = (todo: TodoData): void => {
    (this.todos as any).remove(todo);
  };

  @action updateNewTodoTextAction = (text: string): void => {
    this.newTodoText = text;
  };

  @action setViewAction = (view: TodosView): void => {
    this.view = view;
  };
}
