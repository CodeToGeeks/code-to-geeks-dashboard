import jwtDcode from "jwt-decode";
import axios from "axios";
async function handleAuthJwt(token) {
  let data = await jwtDcode(token);
  localStorage.setItem("user", data.name);
  localStorage.setItem("user_id", data._id);
  localStorage.setItem("role", data.role);
  localStorage.setItem("token", token);
  axios.defaults.headers.common["x-auth-token"] = token;
}
function isAuth() {
  return localStorage.getItem("role") != null;
}

export { isAuth, handleAuthJwt };
