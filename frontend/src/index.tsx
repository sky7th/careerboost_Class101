import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/styles.scss';
import { Provider } from 'mobx-react';
import UserStore from './store/UserStore';
import TodoStore from './store/TodoStore';
import validateEnv from './utils/validateEnv';

validateEnv();

const userState = new UserStore();
const todoState = new TodoStore();

ReactDOM.render(
  <Provider userStore={userState} todoStore={todoState}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
