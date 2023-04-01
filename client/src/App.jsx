import React, { useState, useEffect } from "react";
import PostCreate from "./components/post-create/post-create.component";
import PostItem from "./components/post-item/post-item.component";
import { fetchPosts } from "./utils/post.service";

function App() {
  const [posts, setPosts] = useState([]);
  console.log({ posts });
  useEffect(() => {
    fetchPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);
  return (
    <div className="App">
      <div className="container">
        <PostCreate />
      </div>
      <div className="container">
        <h4>Posts are here</h4>
        <div className="row">
          {posts.map((p) => (
            <div className="col-6" key={p.id}>
              <PostItem id={p.id} title={p.title} comments={p.comments} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
