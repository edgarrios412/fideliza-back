const { default: axios } = require("axios");

const sendPushNotification = async ({pushToken, title, message}) => {
  const body = {
    to: pushToken,
    sound: "default",
    title: title,
    body: message,
    data: { someData: "goes here" },
  };
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

module.exports = {sendPushNotification}