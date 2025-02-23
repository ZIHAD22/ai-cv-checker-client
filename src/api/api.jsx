import axios from "axios";
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = 'http://localhost:5000';
    // config.headers.authorization = `${localStorage.getItem("jwt_token")} `;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;