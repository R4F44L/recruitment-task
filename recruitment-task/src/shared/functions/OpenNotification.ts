import { notification } from "antd";



const OpenNotification = (message: string, description : string, duration: number, icon?: JSX.Element) => {
  notification.open({
    message,
    description,
    duration,
    icon
  });
};
export default OpenNotification;