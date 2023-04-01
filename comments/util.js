const axios = require("axios");

async function notifyEventBus(payload) {
  const response = await axios.post("http://localhost:4005/event", payload);
  return response;
}

module.exports = {
  notifyEventBus,
};
