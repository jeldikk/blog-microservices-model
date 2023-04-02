const axios = require("axios");

async function notifyEventBus(payload) {
  //   console.log({ payload });
  const response = await axios.post(
    "http://eventbus-service:4005/event",
    payload
  );
  //   console.log({ response });
  return response;
}

module.exports = {
  notifyEventBus,
};
