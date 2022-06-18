import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import classes from "./Account.module.css";

const Account = () => {
  const { isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <h1> 'hello'</h1>
    </div>
  );
};
export default Account;
