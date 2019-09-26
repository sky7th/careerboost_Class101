import { observable, computed, action } from 'mobx';
import LoginData from '../interfaces/user/LoginData';
import UserData from '../interfaces/user/UserData';
import { logIn } from '../api/authorization';

export default class TodoStore {
  @observable public isLoggedIn: boolean;
  @observable public userData: UserData | undefined;

  constructor() {
    this.isLoggedIn = false;
    this.userData = undefined;
  }

  @action public logInAction = async (loginData: LoginData) => {
    const userData = await logIn(loginData);
    this.isLoggedIn = true;
    this.userData = userData;
  }

  @action public logOutAction = (): void => {
    this.isLoggedIn = false;
    this.userData = undefined;
  }
}
