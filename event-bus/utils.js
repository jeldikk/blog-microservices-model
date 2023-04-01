const axios = require("axios");

async function notifyEvent(to, event) {
  let url;
  switch (to) {
    case "post":
      url = "http://localhost:4000/event";
      break;
    case "comment":
      url = "http://localhost:4001/event";
      break;
    case "query":
      url = "http://localhost:4002/event";
      break;
    case "moderate":
      url = "http://localhost:4003/event";
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
