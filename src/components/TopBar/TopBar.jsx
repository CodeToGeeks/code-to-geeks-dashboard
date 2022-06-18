import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./TopBar.module.css";
import { Avatar, Button, Row, Col, Badge, Space } from "antd";
import { LogoutOutlined, BellTwoTone } from "@ant-design/icons";
import { signOut } from "./../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "./../../store/account/accountSlice";

import authAction from "./../../store/authSlice";
import logo from "../../logo.svg";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountImage, setAccountImage] = useState("");
  const [accountFirstName, setAccountFirstName] = useState("");
  const getAccountResponse = useSelector((state) => state.account);
  function handleSignOut() {
    signOut();
    dispatch(authAction.actions.reset());
    navigate("/signin");
  }

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  useEffect(() => {
    if (getAccountResponse.account) {
      setAccountImage(getAccountResponse.account.profile_image_link);
      setAccountFirstName(getAccountResponse.account.first_name);
    }
  }, [getAccountResponse]);


  return (
    <div className={classes.TopBar}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div className={classes.leftPart}>
            <Link to="/">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Link>
          </div>
        </Col>

        <Col className="gutter-row" span={12}>
          <div className={classes.rightPart}>
            <Button className={classes.signOutBTN} onClick={handleSignOut}>
              signOut
              <LogoutOutlined />
            </Button>

            <Badge count={1} className={classes.badge} size="small">
              <BellTwoTone style={{ fontSize: "1.3rem" }} />
            </Badge>

            <Space>
              <Space style={{ gap: "1px" }}>
                <Link
                  to={{
                    pathname: '/account',
                  }}
                  title="Review Post"
                >
                  <Avatar
                    alt="affdgfh "
                    src={accountImage}
                    size={39}
                    style={{
                      backgroundColor: "#74bd55",
                      verticalAlign: "middle",
                    }}
                  >
                    {accountFirstName}
                  </Avatar>
                </Link>
              </Space>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;
