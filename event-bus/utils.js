const axios = require("axios");

async function notifyEvent(to, event) {
  let url;
  switch (to) {
    case "post":
      url = "http://posts-ip-service:4000/event";
      break;
    case "comment":
      url = "http://comments-ip-service:4001/event";
      break;
    case "query":
      url = "http://query-ip-service:4002/event";
      break;
    case "moderate":
      url = "http://moderation-ip-service:4003/event";
      break;
  }
  console.log({ url });
  try {
    const response = await axios.post(url, event);
    return response;
  } catch (err) {
    // console.error(err);
    throw new Error({
      type: to,
      message: err.message,
    });
  }
}

module.exports = {
  notifyEvent,
};
