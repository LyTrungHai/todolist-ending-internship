// import axios from "axios";
// import { getToken } from "../index";
// export const updateTodoActionSaga = (data) => {
//   const { todo, newText } = data;
//   console.log(todo, newText);
//   const token = getToken();
//   return axios.post(
//     "http://localhost:3001/api/v1/todos/" + todo.id,
//     { ...todo, title: newText },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

import axiosClient from "../";
export const updateTodoActionSaga = (data) => {
  const { todo, newTitle } = data;
  const todoID = todo.id;
  const url = "/todos/";
  return axiosClient.post(url + todoID, { ...todo, title: newTitle });
};
