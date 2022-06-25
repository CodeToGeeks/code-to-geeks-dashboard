import axios from "axios";

const configAxios = () => {
  axios.defaults.baseURL = process.env.API_URL || "http://localhost:4000/api/v1";
  
  // "https://codetogeeksapi.herokuapp.com/api/v1";
  //
  axios.defaults.timeout = 5000;
};

export default configAxios;
