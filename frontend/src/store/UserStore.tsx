import { observable, computed, action } from 'mobx';
import LoginData from '../interfaces/user/LoginData';
import UserData from '../interfaces/user/UserData';
import RegistrationData from '../interfaces/user/RegistrationData';
import { logIn, logOut, register } from '../api/authorization';

export default class UserStore {
  @observable public isLoggedIn: boolean;
  @observable public loginUser: UserData;

  constructor() {
    this.isLoggedIn = false;
    this.loginUser = {
      _id: '',
      name: '',
      email: '',
    };
  }
  @computed
  public get loginUserInfo(): UserData {
    return this.loginUser;
  }
  @action
  public logInAction = async (loginData: LoginData) => {
    const loginUser: UserData = await logIn(loginData);
    this.loginUser = loginUser;
    this.isLoggedIn = true;
  }
  @action
  public logOutAction = async () => {
    await logOut();
    this.isLoggedIn = false;
    this.loginUser = {
      _id: '',
      name: '',
      email: '',
    };
  }
  @action
  public registerAction = async (registrationData: RegistrationData) => {
    await register(registrationData);
    const loginData = {
      email: registrationData.email,
      password: registrationData.password,
    };
    const loginUser: UserData = await logIn(loginData);
    this.loginUser = loginUser;
    this.isLoggedIn = true;
  }
}
