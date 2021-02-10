import { notification } from "antd";



export const openNotification = (message: string, description : string, duration: number, icon?: JSX.Element) => {
    notification.open({
      message,
      description,
      duration,
      icon
    });
  };