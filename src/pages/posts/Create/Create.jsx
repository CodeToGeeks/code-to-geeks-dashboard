import React, { useState, useEffect } from "react";
import classes from "./Create.module.css";
import { customTools } from "../../../utils/customMdEditor";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { SaveOutlined } from "@ant-design/icons";
import {
  Select,
  Row,
  Col,
  Divider,
  Tag,
  Input,
  Button,
  Space,
  Spin,
} from "antd";
import Notification from "../../../components/Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../store/posts/postsSlice";
import postAction from "../../../store/posts/postsSlice";
const { Option } = Select;

const CreateNewPost = () => {
  document.title = "create post";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ContentValue, setContentValue] = useState("");
  const [choosedTags, setchoosedTags] = useState([]);

  const { isAuth } = useSelector((state) => state.auth);
  const { created, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isError) {
      Notification("error", "Posts Notification", message);
      dispatch(postAction.actions.reset());
    }

    if (created) {
      Notification("success", "Posts Notification", message);
      dispatch(postAction.actions.reset());
      navigate("/posts");
    }
  }, [created, message, isError, navigate, dispatch]);
  const { allTags } = useSelector((state) => state.tags);

  const { TextArea } = Input;
  const children = [];

  for (let i = 0; i < allTags.length; i++) {
    children.push(
      <Option key={allTags[i]._id} label={allTags[i].name}>
        <Tag color={allTags[i].color} key={allTags[i]._id}>
          {allTags[i].name}
        </Tag>
      </Option>
    );
  }

  function handleChangeTags(tagsChoosed) {
    setchoosedTags(tagsChoosed);
  }
  const handleBackToPosts = () => {
    navigate("/posts");
  };

  let handleCreatPost = async () => {
    let notValid = false;
    let validationMessage = "";
    const title = document.getElementById("title").value;
    const slug = document.getElementById("slug").value;
    const excerpt = document.getElementById("excerpt").value;

    switch (0) {
      case title.length:
        notValid = true;
        validationMessage = "Title is empity !";
        break;
      case slug.length:
        notValid = true;
        validationMessage = "Slug is empity !";
        break;
      case excerpt.length:
        notValid = true;
        validationMessage = "Excerpt is empity !";
        break;
      case choosedTags.length:
        notValid = true;
        validationMessage = "No Tags selected !";
        break;
      case ContentValue.length:
        notValid = true;
        validationMessage = "Post content is empity !";
        break;
      default:
        break;
    }

    if (notValid) {
      Notification("warning", "validation Notification", validationMessage);
      return;
    }
    let newPostData = {
      title,
      slug,
      excerpt,
      md: ContentValue,
      tags: choosedTags,
    };
    dispatch(createPost(newPostData));
  };
  return (
    <div className={classes.CreatePostContainer}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Divider orientation="center">Create post </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Title</Divider>
              <Input showCount maxLength={100} placeholder="Title" id="title" />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Slug</Divider>
              <Input showCount maxLength={100} placeholder="Slug" id="slug" />
            </div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Divider orientation="left">Post Excerpt</Divider>
            <div>
              <TextArea showCount maxLength={800} id="excerpt" />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Choose Post Tags</Divider>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Post Tags "
                onChange={handleChangeTags}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {children}
              </Select>
            </div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>
            <div>
              <Divider orientation="center">Post content Editor</Divider>
              <MDEditor
                value={ContentValue}
                height={600}
                onChange={setContentValue}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                extraCommands={customTools()}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className={classes.createBtnDev}>
              <Space>
                <Button
                  className={classes.createBtn}
                  onClick={handleBackToPosts}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  className={classes.createBtn}
                  icon={<SaveOutlined />}
                  onClick={handleCreatPost}
                >
                  Create
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default CreateNewPost;
