import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import middlewares from "./middleware/";
import createRootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

export const configureStore = (state) => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(),
    state,
    composeEnhancer(applyMiddleware(...middlewares(history)))
  );
  return store;
};
