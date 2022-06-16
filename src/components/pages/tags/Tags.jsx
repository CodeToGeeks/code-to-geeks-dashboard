import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Tag } from "antd"; //Button, Modal,
import classes from "./Tags.module.css";
import Notification from "../../Notification";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../store/tags/tagsSlice";
import tagsAction from "../../../store/tags/tagsSlice";
import {
  PlusOutlined,
  DeleteTwoTone,
  // InfoCircleTwoTone,
  EditTwoTone,
  // ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
const Tags = () => {
  // const { confirm } = Modal;
  const pageSize = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading, tags, message, total, isError } = useSelector(
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
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
    if (isError) {
      Notification("error", "Posts Notification", message);
      dispatch(tagsAction.actions.reset());
    }
  }, [isAuth, isError, message, navigate, dispatch]);

  function handleDeleteTag(_id) {
    /*  confirm({
      title: "Do you want to delete this  Post?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      async onOk() {
        let result = await deletePost(_id);
        Notification(
          "top",
          result.deleted === true ? "success" : "error",
          "delete Notification",
          result.message
        );
        if (result.deleted === true)
          setDataSource((pre) => {
            return pre.filter((post) => post._id !== _id);
          });
      },
      onCancel() {},
    });*/
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
