import axios from 'axios';
import LoginData from '../interfaces/user/LoginData';
import RegistrationData from '../interfaces/user/RegistrationData';
import UserData from '../interfaces/user/UserData';

const PATH = 'http://127.0.0.1:5000/auth';

export function register(registrationData: RegistrationData) {
  return axios.post(
    `${PATH}/register`,
    registrationData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as UserData);
}

export function auth() {
  return axios.get(
    PATH,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as UserData);
}

export function logIn(loginData: LoginData) {
  return axios.post(
    `${PATH}/login`,
    loginData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as UserData);
}

export function logOut() {
  return axios.post(
    `${PATH}/logout`,
    null,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data);
}
