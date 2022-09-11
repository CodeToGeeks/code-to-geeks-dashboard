import axios from "axios";

const configAxios = () => {
  axios.defaults.baseURL = "https://codetogeeks.com/api/v1/";
  // "http://13.37.123.41/api/v1/";
  axios.defaults.timeout = 5000;
};

export default configAxios;
