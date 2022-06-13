import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import sagaMiddleware from "./sagaMiddleWare";

const logger = createLogger({
  // ...options
});

const middlewares = (history) => {
  return [routerMiddleware(history), logger, sagaMiddleware];
};

export default middlewares;
