import { all, call } from "redux-saga/effects";
import { requestTodo } from "./todoSaga/todoSaga";
import { requestUser } from "./userSaga/userSaga";

export const rootSaga = function* root() {
  // console.log("rootSaga ");
  yield all([call(requestUser), call(requestTodo)]);
};
