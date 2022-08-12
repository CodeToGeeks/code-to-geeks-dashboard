import React, { useEffect, useCallback } from "react";
import { Table, Tag, Modal } from "antd"; //Button, Modal,
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../../store/logs/logsSlice";
import logsAction from "../../store/logs/logsSlice";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const log_color = {
  error: "error", // antd have default color for error word
  errorc: "#ff4d4f",
  warning: "warning", // antd have default color for warning word
  warningc: "#faad14",
  info: "blue",
  infoc: "blue",
  other: "purple",
  otherc: "purple",
};

const Logs = () => {
  document.title = "logs";

  const pageSize = 9;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading, logs, message, total, isError } = useSelector(
    (state) => state.logs
  );

  const showLogDetails = (data) => {
    const { description, log_type,path } = data;

    switch (log_type) {
      case "error":
        Modal.error({
          title: `This is a error log from path : ${path}`,
          content: `Description:  ${description}`,
        });
        break;
      case "warning":
        Modal.warning({
          title: `This is a warning log from path : ${path}`,
          content: `Description:  ${description}`,
        });
        break;
      case "info":
        Modal.info({
          title: `This is a info log from path : ${path}`,
          content: `Description:  ${description}`,
        });
        break;
      default:
        case "other":
          Modal.info({
            title: `This is a other log from path : ${path}`,
            content: `Description:  ${description}`,
          });
    }
  };

  const fetchData = useCallback(
    async (pageNumber) => {
      dispatch(getLogs({ pageSize, pageNumber }));
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
      Notification("error", "Logs Notification", message);
      dispatch(logsAction.actions.reset());
    }
  }, [isAuth, isError, message, navigate, dispatch]);

  const columns = [
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: "40%",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
      render: (text, record) => (
        <Tag
          color={log_color[record.log_type]}
          style={{ width: "100%", fontSize: "1rem" }}
          key={record._id}
        >
          {text.substring(0, 85)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "log_type",
      key: "log_type",
      width: "10%",
      render: (text, record) => (
        <InfoCircleTwoTone
          style={{ fontSize: "25px" }}
          twoToneColor={log_color[record.log_type + "c"]}
          onClick={() => showLogDetails(record)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey="_id"
        dataSource={logs}
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
    </div>
  );
};

export default Logs;
