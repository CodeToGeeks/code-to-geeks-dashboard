import React, { useState, useEffect } from "react";
import classes from "./Create.module.css";
import { SaveOutlined, BgColorsOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Divider,
  Input,
  Button,
  Space,
  Spin,
  Tooltip,
  Modal,
} from "antd";
import Notification from "../../../Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTag as CreateTagAction } from "../../../../store/tags/tagsSlice";
import tagAction from "../../../../store/tags/tagsSlice";

//
import { Sketch } from "@uiw/react-color";

const CreateTag = () => {
  const { TextArea } = Input;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorPickerHex, setColorPickerHex] = useState("#fff");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setColor(colorPickerHex);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { isAuth } = useSelector((state) => state.auth);
  const { created, isError, isLoading, message } = useSelector(
    (state) => state.tags
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isError) {
      Notification("error", "Tgas Notification", message);
      dispatch(tagAction.actions.reset());
    }

    if (created) {
      Notification("success", "Tags Notification", message);
      dispatch(tagAction.actions.reset());
      navigate("/tags");
    }
  }, [created, message, isError, navigate, dispatch]);

  const handleonChangeName = (e) => {
    setName(e.target.value);
  };
  const handleonChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleonChangeDdscription = (e) => {
    setDescription(e.target.value);
  };

  let handleCreateTag = async () => {
    let notValid = false;
    let validationMessage = "";
    switch (0) {
      case name.length:
        notValid = true;
        validationMessage = "Name is empity !";
        break;
      case color.length:
        notValid = true;
        validationMessage = "Color is empity !";
        break;
      case description.length:
        notValid = true;
        validationMessage = "description is empity !";
        break;

      default:
    }
    if (notValid) {
      Notification("warning", "validation Notification", validationMessage);
      return;
    }
    dispatch(CreateTagAction({ name, color, description }));
  };
  return (
    <div className={classes.CreatePostContainer}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Divider orientation="center">Create Tga</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Name</Divider>
              <Input
                showCount
                maxLength={100}
                placeholder=" write tag Name"
                onChange={handleonChangeName}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Color</Divider>

              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  showCount
                  maxLength={100}
                  placeholder="Write tag color code "
                  onChange={handleonChangeColor}
                  value={color}
                />
                <Tooltip title="Color picker">
                  <Button
                    onClick={showModal}
                    style={{ width: "60px", backgroundColor: color }}
                    icon={<BgColorsOutlined style={{ fontSize: "25px" }} />}
                  />
                </Tooltip>
              </Input.Group>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Description</Divider>
              <TextArea
                showCount
                placeholder="Write description for tag please 😄🔪"
                maxLength={500}
                onChange={handleonChangeDdscription}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="gutter-row" span={24}>
            <div className={classes.createBtnDev}>
              <Space>
                <Button
                  type="primary"
                  className={classes.createBtn}
                  icon={<SaveOutlined />}
                  onClick={handleCreateTag}
                >
                  Create
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Spin>

      <Modal
        title="Color picker"
        visible={isModalVisible}
        onOk={handleOk}
        width="219px"
        onCancel={handleCancel}
        bodyStyle={{ padding: "0px" }}
      >
        <Sketch
          color={colorPickerHex}
          onChange={(color) => {
            setColorPickerHex(color.hex);
          }}
        />
      </Modal>
    </div>
  );
};

export default CreateTag;
