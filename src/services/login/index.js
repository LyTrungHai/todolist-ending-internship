import axiosClient from "../";

export const loginActionSaga = (data) => {
  const url = "/users/login";
  return axiosClient.post(url, data);
};
