// import axios from "axios";

// export const registerActionSaga = (data) => {
//   console.log("data from form", data);
//   return axios
//     .post("http://localhost:3001/api/v1/users/", data)
//     .then((response) => {
//       console.log(response);
//       return response;
//     });
// };
import axiosClient from "../";

export const registerActionSaga = (data) => {
  const url = "/users/";
  return axiosClient.post(url, data);
};
