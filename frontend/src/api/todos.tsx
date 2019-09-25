import axios from 'axios';
import CreatePostData from '../interfaces/todo/CreateTodoData';
import PostData from '../interfaces/todo/TodoData';

const PATH = 'http://127.0.0.1:5000/todos';

export function fetchPosts() {
  return axios.get(
    PATH,
  )
    .then(response => response.data);
}

export function addPost(createPostData: CreatePostData) {
  return axios.post(
    PATH,
    createPostData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as PostData);
}
