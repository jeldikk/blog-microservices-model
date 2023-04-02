const axios = require("axios");

async function notifyEventBus(payload) {
  const response = await axios.post(
    "https://eventbus-service:4005/event",
    payload
  );
  return response;
}

module.exports = {
  notifyEventBus,
};
