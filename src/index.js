import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./redux/configstore";

import sagaMiddleware from "./redux/middleware/sagaMiddleWare";
import { rootSaga } from "./redux/sagas/rootSaga";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore();
sagaMiddleware.run(rootSaga);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
