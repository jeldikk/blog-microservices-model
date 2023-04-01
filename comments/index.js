const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { notifyEventBus } = require("./util");

const PORT = 4001;
const comments = {};

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/posts/:id/comments", (req, res) => {
  const { id: postId } = req.params;
  const postComments = Object.values(comments).filter(
    (v) => v.postId === postId
  );
  res.status(200).json(postComments || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id: postId } = req.params;
  comments[id] = {
    id,
    postId,
    content,
    status: "pending",
  };

  await notifyEventBus({
    type: "CommentCreated",
    data: {
      id,
      postId,
      content,
      status: "pending",
    },
  });
  res.status(201).json(comments[id]);
});

app.post("/event", (req, res) => {
  const event = req.body;
  console.log("recieved at comments event ", event);

  if (event.type === "CommentModerated") {
    notifyEventBus({
      type: "CommentUpdated",
      data: {
        ...event.data,
      },
    }).then(() => {
      res.status(200).json({
        status: "success",
      });
    });
  } else {
    res.status(200).json({
      status: "success",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening comments server on port ${PORT}`);
});
