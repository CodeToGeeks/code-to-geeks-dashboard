import axios from "axios";

const configAxios = () => {
  axios.defaults.baseURL = "http://localhost:4000/api/v1";
  axios.defaults.timeout = 5000;
};

export default configAxios;
