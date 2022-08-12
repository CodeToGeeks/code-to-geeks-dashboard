import React, {  useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Tag,Modal } from "antd"; //Button, Modal,
import classes from "./Tags.module.css";
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getTags, deleteTag } from "../../store/tags/tagsSlice";
import tagsAction from "../../store/tags/tagsSlice";
import {
  PlusOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
const Tags = () => {
  document.title = "tags";


  const pageSize = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading, tags,deleted, message, total, isError } = useSelector(
    (state) => state.tags
  );

  let handleCreatNewPostNavPage = async () => {
    navigate("/tags/create");
  };

  const fetchData = useCallback(
    async (pageNumber) => {
      dispatch(getTags({ pageSize, pageNumber }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
    if (isError) {
      Notification("error", "Tags Notification", message);
      dispatch(tagsAction.actions.reset());
    }
    if (deleted) {
      Notification("success", "Tags Notification", message);
      dispatch(tagsAction.actions.reset());
    }
  }, [isAuth, isError,deleted, message, navigate, dispatch]);

  function handleDeleteTag(_id) {
    confirm({
      title: "Do you want to delete this Tag?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      async onOk() {
        dispatch(deleteTag(_id));
      },
      onCancel() {},
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "60%",
      render: (text, record) => (
        <Tag
          color={text}
          style={{ width: "100%", fontSize: "1rem" }}
          key={record._id}
        >
          {text}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (text, record) => (
        <Space size="large">
          <Link
            to={{
              pathname: `/tags/edit/${record._id}`,
              state: { post: record },
            }}
            title="Edit  Tag"
          >
            <EditTwoTone style={{ fontSize: "25px" }} />
          </Link>

          <DeleteTwoTone
            style={{ fontSize: "25px" }}
            twoToneColor="#c62828"
            onClick={() => handleDeleteTag(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey="_id"
        dataSource={tags}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          defaultCurrent: 1,
          defaultPageSize: pageSize,
          total: total,
          onChange: (page) => {
            fetchData(page);
          },
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
};

export default Tags;
