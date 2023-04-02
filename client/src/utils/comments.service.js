const axios = require("axios");

export async function createComment(postId, content) {
  const response = axios.post(`https://posts.dev/posts/${postId}/comments`, {
    content,
  });

  return response.data;
}

export async function fetchComments(postId) {
  const response = await axios.get(
    `https://posts.dev/posts/${postId}/comments`
  );
  return response.data;
}
