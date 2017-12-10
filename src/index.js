import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <div>
    <Provider store={ store } >
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </div> , document.getElementById("root"));

registerServiceWorker();