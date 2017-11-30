import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <App />
    </Provider>
  </div> , document.getElementById('root'));

registerServiceWorker();