const axios = require("axios");

export async function createPost(title) {
  const response = await axios.post("http://posts.dev/posts/create", {
    title,
  });
  return response.data;
}

export async function fetchPosts() {
  const response = await axios.get("http://posts.dev/posts");
  return Object.values(response.data);
}
