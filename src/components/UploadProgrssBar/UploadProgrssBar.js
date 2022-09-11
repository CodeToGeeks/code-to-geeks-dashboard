import Notification from "../Notification";

function getProgressBarConfig(
  setPage,
  fetchRecords,
  page,
  setIsUploadModalVisible
) {
  const props = {
    name: "file",
    action: "https://codetogeeks.com/api/v1/file",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
    onChange(info) {
      if (info.file.status === "done") {
        Notification(
          "success",
          "Upload Notification",
          `File (${info.file.name}) uploaded successfully 👍⬆️`
        );

        if (page === 1) {
          fetchRecords(1);
          setPage(1);
        } else setPage(1);
        setIsUploadModalVisible(false);
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "Upload Notification",
          `Can’t upload File ${info.file.name} 🥲🚫`
        );
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return props;
}

export default getProgressBarConfig;
