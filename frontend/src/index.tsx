import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import App from './components/App';
import UserStore from './store/UserStore';
import * as serviceWorker from './serviceWorker';

configure({
  enforceActions: true,
});

ReactDOM.render(
  <Provider store={UserStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();