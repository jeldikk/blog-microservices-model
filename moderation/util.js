const axios = require("axios");

async function notifyEventBus(payload) {
  const response = await axios.post("http://localhost:4005/event", payload);
  return response.body;
}

async function notifyEventBusWithDelay(payload, timeDuration = 2500) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:4005/event",
          payload
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, timeDuration);
  });
}

module.exports = {
  notifyEventBus,
  notifyEventBusWithDelay,
};
