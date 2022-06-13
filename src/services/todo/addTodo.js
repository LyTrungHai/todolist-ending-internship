// import axios from "axios";
// import { getToken } from "../index";
// export const addTodoActionSaga = (data) => {
//   console.log("data from form", data);
//   const token = getToken();
//   return axios.post("http://localhost:3001/api/v1/todos", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// };

import axiosClient from "../";
export const addTodoActionSaga = (data) => {
  const url = "/todos";
  return axiosClient.post(url, data);
};
