import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./TopBar.module.css";
import { Avatar, Button, Row, Col, Badge, Menu, Dropdown, Space } from "antd";
import { LogoutOutlined, BellTwoTone, DownOutlined } from "@ant-design/icons";
import { signOut } from "./../../store/authSlice";
import { useDispatch } from "react-redux";
import authAction from "./../../store/authSlice";
import logo from '../../logo.svg'; 
const menu = (
  <Menu
    items={[
      {
        label: localStorage.getItem("user"),
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: <a href="https://www.aliyun.com">Your profile</a>,
        key: "1",
      },

      {
        label: "3rd menu item",
        key: "3",
      },
    ]}
  />
);
const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSignOut() {
    signOut();
    dispatch(authAction.actions.reset());
    navigate("/signin");
  }
  // const handleClick = () => setClick(!click);
  // const Close = () => setClick(false);

  return (
    <div className={classes.TopBar}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12} >
          <div className={classes.leftPart}>
            <Link to="/">
              <img src={logo} alt="Logo" className={classes.logo}  />
              {/* <h2 style={{display: "inline"}}>CODETOGEEKS</h2> */}
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
            <Dropdown overlay={menu} trigger={["click"]} arrow>
              <Space>
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space style={{ gap: "1px" }}>
                  <Avatar
                    src="https://codetogeeks.s3.me-south-1.amazonaws.com/files/789b5a7e-3d5f-4a3b-a05c-62250cff212c.jpg"
                    size={39}
                  />
                  <DownOutlined style={{ fontSize: "0.8rem" }} />
                </Space>
              </Space>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;
