import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();