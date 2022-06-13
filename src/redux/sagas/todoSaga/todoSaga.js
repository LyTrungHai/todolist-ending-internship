import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import { addTodoActionSaga } from "../../../services/todo/addTodo";
import { checkTodoActionSaga } from "../../../services/todo/checkTodo";
import { deleteTodoActionSaga } from "../../../services/todo/deleteTodo";
import { getTodoActionSaga } from "../../../services/todo/getTodo";
import { updateTodoActionSaga } from "../../../services/todo/updateTodo";

export function* onGetTodoSaga() {
  try {
    const listTodo = yield call(getTodoActionSaga);
    console.log(listTodo);
    yield put({ type: "GET_TODO_SAGA", data: listTodo });
  } catch (error) {
    console.log(error);
  }
}

export function* onAddTodoSaga(payload) {
  try {
    const todoInfo = yield call(addTodoActionSaga, payload.todo);
    payload.enqueueSnackbar("Added Todo successfully ✅", {
      variant: "success",
    });
    yield put({ type: "ADD_TODO_SAGA", data: todoInfo });
    console.log(todoInfo);
  } catch (error) {
    payload.enqueueSnackbar(error.response.data.details, {
      variant: "error",
    });
  }
}

export function* onDeleteTodo(payload) {
  try {
    const todoInfo = yield call(deleteTodoActionSaga, payload.todoID);
    console.log(todoInfo.id);
    yield put({ type: "DELETE_TODO_SAGA", data: todoInfo.id });
    payload.enqueueSnackbar("Deleted Todo successfully ✅", {
      variant: "success",
    });
  } catch (error) {
    payload.enqueueSnackbar(error.response.data.details, {
      variant: "error",
    });
  }
}

export function* onCheckCompleTodo(payload) {
  try {
    const todoInfo = yield call(checkTodoActionSaga, payload.todo);
    yield put({ type: "CHECKCOMPLETE_TODO_SAGA", data: todoInfo });
  } catch (error) {
    payload.enqueueSnackbar(error.response.data.details, {
      variant: "error",
    });
  }
}

export function* updateTodo(payload) {
  try {
    const todoInfo = yield call(updateTodoActionSaga, payload);

    yield put({ type: "UPDATE_TODO_SAGA", data: todoInfo });
    payload.enqueueSnackbar("Update Todo successfully ✅", {
      variant: "success",
    });
  } catch (error) {
    payload.enqueueSnackbar(error.response.data.details, {
      variant: "error",
    });
  }
}

export function* requestTodo() {
  yield takeLatest("GET_TODO", onGetTodoSaga);
  yield takeLatest("ADD_TODO", onAddTodoSaga);
  yield takeLatest("DELETE_TODO", onDeleteTodo);
  yield takeLatest("COMPLETE_TODO", onCheckCompleTodo);
  yield takeLatest("UPDATE_TODO", updateTodo);
}
