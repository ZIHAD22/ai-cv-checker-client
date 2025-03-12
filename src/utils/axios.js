import axios from "axios";
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = `${localStorage.getItem("jwt_token")} `;
    // console.log(localStorage.getItem("jwt_token"));
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
