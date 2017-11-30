import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </div> , document.getElementById('root'));

registerServiceWorker();