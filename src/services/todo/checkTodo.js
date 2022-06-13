// import { getToken } from "../index";

// export const checkTodoActionSaga = (todo) => {
//   const token = getToken();
//   const newStatus = todo.status === "true" ? false : true;
//   return axios.post(
//     `http://localhost:3001/api/v1/todos/${todo.id} `,
//     { ...todo, status: newStatus },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

import axiosClient from "../";
export const checkTodoActionSaga = (todo) => {
  const todoID = todo.id;
  const url = "/todos/";
  const newStatus = todo.status === "false" ? true : false;
  return axiosClient.post(url + todoID, { ...todo, status: newStatus });
};
