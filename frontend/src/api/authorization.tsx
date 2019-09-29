import 'dotenv/config';
import axios from 'axios';
import LoginData from '../interfaces/user/LoginData';
import RegistrationData from '../interfaces/user/RegistrationData';
import UserData from '../interfaces/user/UserData';


export function register(registrationData: RegistrationData) {
  return axios.post(
    `${process.env.SERVER_API_URL}/auth/register`,
    registrationData,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as UserData);
}

export function auth() {
  return axios.get(
    `${process.env.SERVER_API_URL}/auth`,
    {
      withCredentials: true,
    },
  )
    .then(response => response.data as UserData);
}

export function logIn(loginData: LoginData) {
  return axios.post(
    `${process.env.SERVER_API_URL}/auth/login`,
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
