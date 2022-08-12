import React, { useState, useEffect } from "react";
import classes from "./EditPost.module.css";
import { resetCoverImage,uploadPostCoverImage } from "../../../api/post";
import { customTools } from "../../../utils/customMdEditor";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";
import rehypeSanitize from "rehype-sanitize";
import {
  SaveOutlined,
  CloseOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Select,
  Row,
  Col,
  Upload,
  Divider,
  Input,
  Button,
  Space,
  Tag,
  Spin,
  Image,
  Switch,
} from "antd";
import Notification from "../../../components/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePostById } from "../../../store/posts/onePostSlice";
import { updatePost } from "../../../store/posts/postsSlice";
import postAction from "../../../store/posts/postsSlice";
import onePostAction from "./../../../store/posts/onePostSlice";
const { Option } = Select;

const EditPost = () => {
  document.title = "edit post";

  const  {id} =  useParams();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentValue, setcontentValue] = useState("");
  const [choosedTags, setchoosedTags] = useState([]);
  const [publishState, setPublishState] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const { isAuth } = useSelector((state) => state.auth);
  const getPostResponse = useSelector((state) => state.post);
  const updatePostResponse = useSelector((state) => state.posts);

  const handleonChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleonChangeSlug = (e) => {
    setSlug(e.target.value);
  };
  const handleonChangeExcerpt = (e) => {
    setExcerpt(e.target.value);
  };

  const handleOnChangePublishState = () => {
    setPublishState(!publishState);
  };
  const handleResetCoverImage = async () => {
    const result = await resetCoverImage(id);
    Notification(result.state, "Posts Notification", result.message);
    if (result.state === "success") setCoverImage(null);
  };

  const handleBackToPosts = () => {
    navigate("/posts");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getOnePostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (getPostResponse.post) {
      setCoverImage(getPostResponse.post.cover_image_link);
      setTitle(getPostResponse.post.title);
      setSlug(getPostResponse.post.slug);
      setcontentValue(getPostResponse.post.md);
      setExcerpt(getPostResponse.post.excerpt);
      setchoosedTags(getPostResponse.post.tags);
      setPublishState(getPostResponse.post.published);
    }
  }, [getPostResponse]);
  const { allTags } = useSelector((state) => state.tags);

  useEffect(() => {
    if (getPostResponse.isError) {
      Notification("error", "Posts Notification", getPostResponse.message);
      dispatch(onePostAction.actions.reset());
    }
    if (updatePostResponse.isError) {
      Notification("error", "Posts Notification", updatePostResponse.message);
      dispatch(postAction.actions.reset());
    }

    if (updatePostResponse.updated) {
      Notification("success", "Posts Notification", updatePostResponse.message);
      dispatch(postAction.actions.reset());
      navigate("/posts");
    }
  }, [getPostResponse, updatePostResponse, navigate, dispatch]);

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

  let handleUpdatePost = async () => {
    let notValid = false;
    let validationMessage = "";
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
      case contentValue.length:
        notValid = true;
        validationMessage = "Post content is empity !";
        break;
      default:
    }
    if (notValid) {
      Notification("warning", "validation Notification", validationMessage);
      return;
    }
    let postData = {
      _id: id,
      post: {
        title,
        slug,
        excerpt,
        md: contentValue,
        tags: choosedTags,
        published: publishState,
      },
    };
    dispatch(updatePost(postData));
  };
  return (
    <div className={classes.CreatePostContainer}>
      <Spin
        tip="Loading..."
        spinning={getPostResponse.isLoading || updatePostResponse.isLoading}
      >
        <Divider orientation="center">Edit Post</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Title</Divider>
              <Input
                showCount
                maxLength={100}
                placeholder="Title"
                id="title"
                value={title}
                onChange={handleonChangeTitle}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="left">Slug</Divider>
              <Input
                showCount
                maxLength={100}
                placeholder="Slug"
                id="slug"
                value={slug}
                onChange={handleonChangeSlug}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Divider orientation="left">Post Excerpt</Divider>
            <div>
              <TextArea
                showCount
                maxLength={800}
                id="excerpt"
                value={excerpt}
                onChange={handleonChangeExcerpt}
              />
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
                value={choosedTags}
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
          <Col className="gutter-row" span={12}>
            <Divider orientation="center">Cover Image</Divider>

            <Space size="large">
              {coverImage && (
                <Image width={200} height={100} src={coverImage} />
              )}

              <Button
                danger
                // type="danger"
                className={classes.createBtn}
                icon={<CloseOutlined />}
                onClick={handleResetCoverImage}
              >
                Reset
              </Button>


              <Upload {...uploadPostCoverImage(id, setCoverImage)} >
          
          <Button
                type="primary"
                className={classes.createBtn}
                icon={<ArrowUpOutlined />}
            
              >
                {coverImage ? "Change" : "Add"}
              </Button>
        </Upload>
            
            </Space>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Divider orientation="center">Publish State</Divider>
              <Switch
                checkedChildren="Published"
                checked={publishState}
                unCheckedChildren="Unpublished"
                defaultChecked
                onChange={handleOnChangePublishState}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>
            <div>
              <Divider orientation="center">Post content Editor</Divider>
              <MDEditor
                value={contentValue}
                height={600}
                onChange={setcontentValue}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                extraCommands={customTools()}
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
                  onClick={handleBackToPosts}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  className={classes.createBtn}
                  icon={<SaveOutlined />}
                  onClick={handleUpdatePost}
                >
                  Save
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default EditPost;
