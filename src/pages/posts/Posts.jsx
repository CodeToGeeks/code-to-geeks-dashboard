import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table, Tag, Space, Modal, Tabs } from "antd";
import Notification from "../../components/Notification";
import classes from "./Posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost } from "../../store/posts/postsSlice";
import postAction from "../../store/posts/postsSlice";
import {
  PlusOutlined,
  DeleteTwoTone,
  InfoCircleTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  StopTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { confirm } = Modal;

function Posts() {
  document.title = "posts";
 
  const pageSize = 12;
  const [publishState, setPublishState] = useState("published");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading, posts, message, total, isError, deleted } = useSelector(
    (state) => state.posts
  );
  const { allTags } = useSelector((state) => state.tags);

  const fetchData = useCallback(
    async (pageNumber, publishState) => {
      dispatch(getPosts({ pageSize, pageNumber, state: publishState }));
    },
    [dispatch]
  );
  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
    if (isError) {
      Notification("error", "Posts Notification", message);
      dispatch(postAction.actions.reset());
    }
    if (deleted) {
      Notification("success", "Posts Notification", message);
      dispatch(postAction.actions.reset());
    }
  }, [isAuth, isError, message, deleted, navigate, dispatch]);

  useEffect(() => {
    fetchData(1, publishState);
  }, [fetchData, publishState]);

  let handleCreatNewPostNavPage = async () => {
    navigate("/posts/create");
  };

  function handleDeletePost(_id) {
    confirm({
      title: "Do you want to delete this Post?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      async onOk() {
        dispatch(deletePost(_id));
      },
      onCancel() {},
    });
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
      render: (text) => <div>{text.substring(0, 30)}</div>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: "20%",
      render: (text) => <div>{text.substring(0, 30)}</div>,
    },
    {
      title: "Author",
      dataIndex: "author_name",
      key: "author",
      width: "10%",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "25%",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let data = allTags.find((tagData) => tagData._id === tag);

            return (
              <Tag color={data.color} key={data._id}>
                {data.name}
              </Tag>
            );
          }) }
        </>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (text, record) => (
        
        <Space size="large">
          <Link
            to={{
              pathname: `/posts/edit/${record._id}`,
              state: { post: record },
            }}
            title="Edit Post"
            
          >
            <EditTwoTone style={{ fontSize: "25px" }} />
          </Link>

          <DeleteTwoTone
            style={{ fontSize: "25px" }}
            twoToneColor="#c62828"
            onClick={() => handleDeletePost(record._id)}
          />

          <Link
            to={{
              pathname: `/posts/review/${record._id}`,
              state: { post: record },
            }}
            title="Review Post"
         
          >
            <InfoCircleTwoTone
              style={{ fontSize: "25px" }}
              twoToneColor="#50D050"
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={() => {
          setPublishState(
            publishState === "published" ? "unpublished" : "published"
          );
        }}
      >
        <TabPane
          tab={
            <span style={{ fontSize: "18px" }}>
              <CheckCircleTwoTone
                twoToneColor="#50D050"
                style={{ fontSize: "25px" }}
              />
              Published
            </span>
          }
          key="1"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ fontSize: "18px" }}>
              <StopTwoTone
                style={{ fontSize: "25px" }}
                twoToneColor="#c62828"
              />
              Unpublished
            </span>
          }
          key="2"
          o
        ></TabPane>
      </Tabs>

      <Table
        loading={isLoading}
        columns={columns}
        rowKey="_id"
        dataSource={posts}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          defaultCurrent: 1,
          defaultPageSize: pageSize,
          total: total,

          onChange: (pageNumber) => fetchData(pageNumber),
        }}
        
      />

      <div className={classes.createBtnDiv}>
        <button
          className={classes.createBtn}
          onClick={handleCreatNewPostNavPage}
        >
          <PlusOutlined style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

export default Posts;
