// import axios from "axios";

// import { getToken } from "../index";

// export const deleteTodoActionSaga = (id) => {
//   console.log(id, "ID TODO");
//   const token = getToken();
//   return axios
//     .delete(`http://localhost:3001/api/v1/todos/${id} `, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       console.log(response);
//       return response;
//     });
// };

import axiosClient from "../";

export const deleteTodoActionSaga = (id) => {
  const todoID = id;
  const url = "/todos/";
  return axiosClient.delete(url + todoID);
};
