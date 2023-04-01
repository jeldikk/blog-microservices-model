const axios = require("axios");

export async function createPost(title) {
  const response = await axios.post("http://localhost:4000/posts", { title });
  return response.data;
}

export async function fetchPosts() {
  const response = await axios.get("http://localhost:4002/posts");
  return Object.values(response.data);
}
