import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Divider, Spin } from "antd";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, message, isError } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuth) {
      if (message) Notification("success", "SignIn Notification", message);
      navigate("/");
    }
    if ((!isAuth)&&isError&& isLoading === false) {
      Notification("error", "SignIn Notification", message);
    }
  }, [isAuth, message, isError, navigate,isLoading]);

  const onFinish = (values) => {
    dispatch(signIn({ email: values.email, password: values.password }));
  };

  return (



    <div className={classes.signInForm}>
      <Spin tip="Loading..." spinning={isLoading}>

        
        <Row>
          <Col className="gutter-row" span={24}>
            <div className={classes.typewriter}>
              <h1>WELCOME FOR YOU IN CODE TO GEEKS ADMIN DASHBOARD.</h1>
            </div>
          </Col>
        </Row>
        <Divider orientation="center"></Divider>
  
        <Row >
          <Col className="gutter-row" span={12} offset={5}>
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please Enter your Email!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please Enter your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  SignIn
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Login;
