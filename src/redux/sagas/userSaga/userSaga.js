import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import { loginActionSaga } from "../../../services/login";
import { registerActionSaga } from "../../../services/register";

function* onLoginSaga(payload) {
  try {
    const userInfo = yield call(loginActionSaga, payload.userInfo);
    console.log(userInfo);
    yield put({ type: "LOGIN_SUCCESS", data: userInfo });
    payload.enqueueSnackbar("Welcome To Trung Hai's Page 🥰 ", {
      variant: "success",
    });
    payload.navigate("/todopage");
    return userInfo;
  } catch (errors) {
    payload.enqueueSnackbar(errors.response.data.details, {
      variant: "error",
    });
    // console.log(errors);
  }
}

function* onRegisterSaga(payload) {
  try {
    yield call(registerActionSaga, payload.userInfo);
    payload.enqueueSnackbar("Register successfully ", {
      variant: "success",
    });
    payload.resetForm();
  } catch (error) {
    payload.enqueueSnackbar(error.response.data.details, {
      variant: "error",
    });
  }
}

export function* requestUser() {
  yield takeLatest("REGISTER", onRegisterSaga);
  yield takeLatest("LOGIN", onLoginSaga);
}
