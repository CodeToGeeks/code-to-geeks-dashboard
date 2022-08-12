import React, { useState, useEffect } from "react";
import classes from "./EditTag.module.css";
import { SaveOutlined,BgColorsOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Input, Button, Space, Spin,  Tooltip,
  Modal, } from "antd";
import Notification from "../../../components/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneTagById } from "../../../store/tags/oneTagSlice";
import { updateTag } from "../../../store/tags/tagsSlice";
import tagAction from "../../../store/tags/tagsSlice";
import oneTagAction from "./../../../store/tags/oneTagSlice";
import { Sketch } from "@uiw/react-color";
import { getAllTags } from "../../../store/tags/tagsSlice";
const EditTag = () => {
  document.title = "edit tag";

  const { TextArea } = Input;
  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [colorPickerHex, setColorPickerHex] = useState("#fff");
  const [description, setDescription] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const getTagResponse = useSelector((state) => state.tag);
  const updateTagResponse = useSelector((state) => state.tags);

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getOneTagById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (getTagResponse.tag) {
      setName(getTagResponse.tag.name);
      setColor(getTagResponse.tag.color);
      setColorPickerHex(getTagResponse.tag.color);
      setDescription(getTagResponse.tag.description);
    }
  }, [getTagResponse]);

  useEffect(() => {
    if (getTagResponse.isError) {
      Notification("error", "Tags Notification", getTagResponse.message);
      dispatch(oneTagAction.actions.reset());
    }
    if (updateTagResponse.isError) {
      Notification("error", "Tags Notification", updateTagResponse.message);
      dispatch(tagAction.actions.reset());
    }

    if (updateTagResponse.updated) {
      Notification("success", "Tags Notification", updateTagResponse.message);
      dispatch(tagAction.actions.reset());
      dispatch(getAllTags());
      navigate("/tags");
    }

    // updatePostResponse, navigate,
  }, [getTagResponse, updateTagResponse, navigate, dispatch]);

  const handleonChangeName = (e) => {
    setName(e.target.value);
  };
  const handleonChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleonChangeDdscription = (e) => {
    setDescription(e.target.value);
  };


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

  useEffect(() => {
    async function fetchMyAPI() {
      await getOneTagById(setName, setColor, setDescription, id);
    }

    fetchMyAPI();
  }, [id]);

  const handleBackToTags = () => {
    navigate("/tags");
  };
  let handleUpdateTag = async () => {
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

    let tagData = {
      _id: id,
      tag: { name, color, description },
    };
    dispatch(updateTag(tagData));
  };
  return (
    <div className={classes.CreatePostContainer}>
      <Spin
        tip="Loading..."
        spinning={getTagResponse.isLoading || updateTagResponse.isLoading}
      >
        <Divider orientation="center">Edit Tga</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Name</Divider>
              <Input
                showCount
                maxLength={100}
                value={name}
                onChange={handleonChangeName}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Color</Divider>
              {/* <Input
                showCount
                maxLength={100}
                value={color}
                onChange={handleonChangeColor}
              /> */}

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
                maxLength={500}
                value={description}
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
                  className={classes.createBtn}
                  onClick={handleBackToTags}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  className={classes.createBtn}
                  icon={<SaveOutlined />}
                  onClick={handleUpdateTag}
                >
                  Save
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

export default EditTag;
