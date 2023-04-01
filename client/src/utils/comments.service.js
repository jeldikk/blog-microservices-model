const axios = require("axios");

export async function createComment(postId, content) {
  const response = axios.post(
    `http://localhost:4001/posts/${postId}/comments`,
    {
      content,
    }
  );

  return response.data;
}

export async function fetchComments(postId) {
  const response = await axios.get(
    `http://localhost:4001/posts/${postId}/comments`
  );
  return response.data;
}
