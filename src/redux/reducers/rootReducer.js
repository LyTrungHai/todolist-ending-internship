import { combineReducers } from "redux";

// import { todoReducer } from "./todoReducer";
import { loginReducer } from "./loginReducer";
import { todoReducer } from "./todoReducer";

const createRootReducer = () => {
  const reducers = combineReducers({
    loginReducer,
    todoReducer, // import todo reducer
  });
  return reducers;
};

export default createRootReducer;
