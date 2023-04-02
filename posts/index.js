const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { notifyEventBus } = require("./util");

const PORT = 4000;

const posts = {};

const app = express();

app.use(express.json());
app.use(cors());

app.post("/posts/create", async (req, res) => {
  console.log("post occurred at /posts/create");
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  try {
    posts[id] = {
      id,
      title,
    };
    // console.log({ posts });
    const notifyResponse = await notifyEventBus({
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
    // console.log({ notifyResponse });
    res.status(201).json(posts[id]);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/posts", (req, res) => {
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

app.post("/event", async (req, res) => {
  console.log("recieved at post event");
  res.status(200).json({
    status: "success",
  });
});

app.listen(PORT, () => {
  console.log(`Listening Post Server at port ${PORT}`);
  console.log("With some change for posts:latest");
});
