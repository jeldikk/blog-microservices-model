const express = require("express");
const { notifyEvent } = require("./utils");
const PORT = 4005;

const app = express();

app.use(express.json());

app.use((req, res, _next) => {
  const { type, data } = req.body;
  console.log(`Event Bus : [${type}] `, data);
  _next();
});

app.post("/event", async (req, res) => {
  const event = req.body;
  console.log("event recieved at event-bus with payload ", event);
  const promises = ["post", "comment", "query", "moderate"].map((service) =>
    notifyEvent(service, event)
  );
  //   console.log({ promises });
  Promise.all(promises).then((responses) => {
    // console.log({ responses });
    res.status(200).json({
      status: "success",
    });
  });
});

app.listen(PORT, () =>
  console.log(`Listening EventBus server on port ${PORT}`)
);
