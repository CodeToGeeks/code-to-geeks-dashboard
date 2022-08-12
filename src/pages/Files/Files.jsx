import React, { useState, useEffect, useCallback } from "react";
import classes from "./Files.module.css";
import {
  Table,
  Space,
  Button,
  Upload,
  Modal,
  Avatar,
  Image,
  Divider,
  Input,
} from "antd";
import Notification from "../../components/Notification";
import fileType from "../../utils/urlTypes";
import {
  DeleteTwoTone,
  EditTwoTone,
  UploadOutlined,
  DownloadOutlined,
  VideoCameraTwoTone,
  FilePdfTwoTone,
  FileZipTwoTone,
  ExclamationCircleOutlined,
  FileExclamationTwoTone,
  CopyTwoTone,
  SaveOutlined,
} from "@ant-design/icons";

import progrssBarConfig from "../../components/UploadProgrssBar/UploadProgrssBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiles,
  updateFile,
  deleteFile,
  downloadFile,
} from "../../store/files/filesSlice";
import filesAction from "../../store/files/filesSlice";
import { useNavigate } from "react-router-dom";
const pageSize = 7;
const Files = () => {
  document.title = "files";
  const { confirm } = Modal;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [recordWillUpdate, setRecordWillUpdate] = useState({
    _id: "",
    fileName: "",
  });
  const { isAuth } = useSelector((state) => state.auth);
  const {
    isLoading,
    files,
    message,
    updated,
    downloaded,
    deleted,
    total,
    isError,
  } = useSelector((state) => state.files);

  const fetchData = useCallback(
    async (pageNumber) => {
      dispatch(getFiles({ pageSize, pageNumber }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
    if (isError) {
      Notification("error", "File Notification", message);
      dispatch(filesAction.actions.reset());
    }

    if (updated || deleted || downloaded) {
      Notification("success", "Files Notification", message);
      dispatch(filesAction.actions.reset());
    }
  }, [
    isAuth,
    isError,
    message,
    updated,
    deleted,
    downloaded,
    navigate,
    dispatch,
  ]);

  // ---------------

  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isUpdateFileNameModalVisible, setIsUpdateFileNameModalVisible] =
    useState(false);

  //  ---------------upload model---------
  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadModalCancel = () => {
    setIsUploadModalVisible(false);
  };
  // ------------------------------------

  //    update file name model

  const handleUpdateFileName = (record) => {
    setRecordWillUpdate({
      _id: record._id,
      fileName: record.original_name,
    });
    setIsUpdateFileNameModalVisible(true);
  };

  const handleUpdateNameModalCancel = () => {
    setIsUpdateFileNameModalVisible(false);
  };
  const handleonChangerecordWillUpdate = (e) => {
    setRecordWillUpdate({
      _id: recordWillUpdate._id,
      fileName: e.target.value,
    });
  };

  const handleSaveNewFileName = async () => {
    dispatch(updateFile(recordWillUpdate));
    setIsUpdateFileNameModalVisible(false);
    fetchData(page);
  };

  //           file operations

  async function handleDownloadFile(url, fileName) {
    dispatch(downloadFile({ url, fileName }));
  }

  async function handleCopyUrl(fileLink) {
    navigator.clipboard.writeText(fileLink);
    Notification(
      "success",
      "Copy Notification",
      "File URL copied to clipboard 👍😊"
    );
  }

  function handleDelete(_id) {
    confirm({
      title: "Do you want to delete this File?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      async onOk() {
        dispatch(deleteFile(_id));
        fetchData(page);
      },
      onCancel() {},
    });
  }

  // ---------------------------------

  // Table columns config
  const columns = [
    {
      title: "File",
      width: "10%",
      render: (record) => (
        <div key={record._id}>
          <Avatar
            shape="square"
            style={{ width: "80px", height: "50px", fontSize: "40px" }}
            src={
              fileType(record.file_link) === "image" ? (
                <Image src={record.file_link} width={80} height={50} />
              ) : fileType(record.file_link) === "video" ? (
                <VideoCameraTwoTone />
              ) : fileType(record.file_link) === "pdf" ? (
                <FilePdfTwoTone />
              ) : fileType(record.file_link) === "compression" ? (
                <FileZipTwoTone />
              ) : (
                <FileExclamationTwoTone />
              )
            }
          />
        </div>
      ),
    },

    {
      title: "File Name",
      width: "17%",
      render: (record) => (
        <div key={record._id}>
          {record.original_name + "." + record.extention}
        </div>
      ),
    },
    {
      title: "File Link",
      key: "FileLink",
      width: "55%",
      render: (record) => (
        <div key={record._id}>
          <label>{record.file_link}</label>
        </div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (text, record) => (
        <Space size="large">
          <EditTwoTone
            style={{ fontSize: "25px" }}
            onClick={() => handleUpdateFileName(record)}
          />

          <DeleteTwoTone
            style={{ fontSize: "25px" }}
            twoToneColor="#c62828"
            onClick={() => handleDelete(record._id)}
          />

          <CopyTwoTone
            style={{ fontSize: "25px" }}
            onClick={() => handleCopyUrl(record.file_link)}
          />
          <DownloadOutlined
            style={{ fontSize: "25px" }}
            onClick={() =>
              handleDownloadFile(
                record.file_link,
                record.original_name + "." + record.extention
              )
            }
          />
        </Space>
      ),
    },
  ];
  // -------------------------------------
  return (
    <div>
      {/*--------------upload file model ----------------*/}
      <Modal
        title="Upload File"
        visible={isUploadModalVisible}
        onCancel={handleUploadModalCancel}
        footer={[
          <Button key="back" onClick={handleUploadModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Upload
          {...progrssBarConfig(
            setPage,
            fetchData,
            page,
            setIsUploadModalVisible
          )}
        >
          <Button style={{ marginLeft: "11rem" }} key="submit" type="primary">
            Choose File
          </Button>
        </Upload>
      </Modal>
      {/* --------------edit file name model--------------  */}
      <Modal
        title="Update File Name"
        visible={isUpdateFileNameModalVisible}
        onCancel={handleUpdateNameModalCancel}
        footer={[
          <Button key="back" onClick={handleUpdateNameModalCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            icon={<SaveOutlined />}
            key="save"
            onClick={handleSaveNewFileName}
          >
            Save
          </Button>,
        ]}
      >
        <Divider orientation="left">File Name</Divider>
        <Input
        key={"editFileName"}
          showCount
          maxLength={50}
          value={recordWillUpdate.fileName}
          onChange={handleonChangerecordWillUpdate}
        />
      </Modal>
      {/* Table--------------------- */}
      <Table
        loading={isLoading}
        columns={columns}
        rowKey="_id"
        dataSource={files}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          defaultCurrent: 1,
          defaultPageSize: pageSize,
          total: total,
          onChange: (page) => {
            // fetchData(page);
            setPage(page);
          },
        }}
      />

      <div className={classes.createBtnDiv}>
        <button className={classes.createBtn} onClick={showUploadModal}>
          <UploadOutlined style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
};

export default Files;
