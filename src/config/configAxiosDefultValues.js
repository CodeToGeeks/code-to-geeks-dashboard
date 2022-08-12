import axios from "axios";

const configAxios = () => {
  axios.defaults.baseURL = "http://localhost:4000/api/v1/"
  
  // "http://localhost:4000/api/v1/";
  
  // "http://157.175.208.59/api/v1/"  
  //
  axios.defaults.timeout = 5000;
};

export default configAxios;
