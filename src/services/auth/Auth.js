import jwtDcode from "jwt-decode";
import axios from "axios";
async function handleAuthJwt(token) {
  let data = await jwtDcode(token);
  if(data.role !== "user"){
  localStorage.setItem("user", data.name);
  localStorage.setItem("user_id", data._id);
  localStorage.setItem("role", data.role);
  localStorage.setItem("token", token);
  axios.defaults.headers.common["x-auth-token"] = token;
  }
  return data.role;
}
function isAuth() {
  const role = localStorage.getItem("role");

  return (role !== null) && (role !== "user");
}

export { isAuth, handleAuthJwt };
