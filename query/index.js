const express = require("express");
const cors = require("cors");

const PORT = 4002;
const app = express();

const posts = {};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).json(Object.values(posts) || []);
});

app.post("/event", (req, res) => {
  const body = req.body;
  console.log("body in query is :", body);
  const { type, data } = body;
  if (type === "PostCreated") {
    posts[data.id] = {
      ...data,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    posts[data.postId] = {
      ...posts[data.postId],
      comments: [
        ...posts[data.postId]["comments"],
        { id: data.id, content: data.content, status: data.status },
      ],
    };
  } else if (type === "CommentUpdated") {
    posts[data.postId] = {
      ...posts[data.postId],
      comments: posts[data.postId]["comments"].map((comm) => {
        const { id, content, status } = comm;
        if (id === data.id) {
          return {
            id,
            content,
            status: data.status,
          };
        } else {
          return comm;
        }
      }),
    };
  }
  // console.log({ posts });
  res.status(200).json({
    status: "success",
  });
});

app.listen(PORT, () => {
  console.log("Listening Query server listening on port " + PORT);
});
