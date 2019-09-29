import axios from 'axios';
import CreateTodoData from '../interfaces/todo/CreateTodoData';
import TodoData from '../interfaces/todo/TodoData';
import UserData from '../interfaces/user/UserData';

export function fetchTodos(loginUser: UserData) {
  return axios.get(
    `${process.env.SERVER_API_URL}/todos/byUser/${loginUser._id}`,
  )
    .then(response => response.data);
}

export function addTodoApi(createTodoData: CreateTodoData) {
  return axios.post(
    `${process.env.SERVER_API_URL}/todos`,
    createTodoData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as TodoData);
}

export function deleteTodoApi(todoId: string) {
  console.log('제발');
  return axios.delete(
    `${process.env.SERVER_API_URL}/todos/${todoId}`,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.data);
}
