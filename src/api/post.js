import axios from "axios";
import Notification from "../components/Notification";
export const resetCoverImage = async (_id) => {
  try {
    const res = await axios.post(`/post/cover/image/reset/${_id}`);

    return { state: "success", message: res.data.message };
  } catch (err) {
    return { state: "error", message: err.message };
  }
};

export function  uploadPostCoverImage (_id,setCoverImage) {
  const props = {
    name: "file",
  
    action: `https://codetogeeks.com/api/v1/post/cover/image/${_id}`,
    
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
    onChange(info) {
      if (info.file.status === "done") {
        setCoverImage(info.file.response.link);
        Notification(
          "success",
          "Upload Notification",
          `File (${info.file.name}) uploaded successfully 👍⬆️`
        );
        // setCoverImage()
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
