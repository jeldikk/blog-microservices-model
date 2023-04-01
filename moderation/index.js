const express = require("express");
const { notifyEventBus, notifyEventBusWithDelay } = require("./util");

const PORT = 4003;

const app = express();

app.use(express.json());

app.post("/event", async (req, res) => {
  console.log("request received on moderation server with body :", req.body);
  const event = req.body;

  if (event.type === "CommentCreated") {
    let approvalStatus;
    if (event.data.content.includes("orange")) {
      approvalStatus = "rejected";
    } else {
      approvalStatus = "approved";
    }

    notifyEventBusWithDelay(
      {
        type: "CommentModerated",
        data: {
          ...event.data,
          status: approvalStatus,
        },
      },
      5000
    )
      .then(() => {
        res.status(200).json({
          status: "success",
        });
      })
      .catch((err) => {});
  } else {
    res.status(200).json({
      status: "success",
    });
  }
});

app.listen(PORT, () => {
  console.log("Listening Moderation server on port " + PORT);
});
