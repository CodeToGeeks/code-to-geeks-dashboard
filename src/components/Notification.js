import { notification } from "antd";

// type [ success, info,  warning, error]
// placement [ topRight, top, bottomLeft, topLeft ,bottomRight]
const Notification = (type, title, description) => {
  notification[type]({
    message: title,
    description,
    placement: "top",
  });
};

export default Notification;
