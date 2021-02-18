import { notification } from "antd";

const openNotification = (message: string, description : string, duration: number, icon?: JSX.Element) => {
  notification.open({
    message,
    description,
    duration,
    icon
  });
};

export default openNotification;