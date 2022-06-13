// import axios from "axios";
// import { getToken } from "../index";

// export const getTodoActionSaga = () => {
//   const token = getToken();
//   return axios.get("http://localhost:3001/api/v1/todos", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

import axiosClient from "../";
export const getTodoActionSaga = () => {
  const url = "/todos";
  return axiosClient.get(url);
};
