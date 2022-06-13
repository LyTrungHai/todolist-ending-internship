import axios from "axios";
// export function getToken() {
//   const info = JSON.parse(localStorage.getItem("LOGIN_USER"));
//   const accessToken = info.token;
//   return accessToken;
// }

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const user_info = JSON.parse(localStorage.getItem("LOGIN_USER"));
    if (user_info) {
      const user_token = user_info.token ?? {};
      config.headers["Authorization"] = "Bearer " + user_token;
    }
    config.headers["Content-type"] = "application/json";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default axiosClient;
