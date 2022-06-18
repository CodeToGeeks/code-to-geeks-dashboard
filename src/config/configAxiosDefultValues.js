import axios from "axios";

const configAxios = () => {
  axios.defaults.baseURL = "https://codetogeeksapi.herokuapp.com/api/v1";
  axios.defaults.timeout = 5000;
};

export default configAxios;
