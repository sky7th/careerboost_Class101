import axios from 'axios';
import CreateTodoData from '../interfaces/todo/CreateTodoData';
import TodoData from '../interfaces/todo/TodoData';

const PATH = 'http://127.0.0.1:5000/todos';

export function fetchTodos() {
  return axios.get(
    PATH,
  )
    .then(response => response.data);
}

export function addTodo(createTodoData: CreateTodoData) {
  return axios.post(
    PATH,
    createTodoData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as TodoData);
}
