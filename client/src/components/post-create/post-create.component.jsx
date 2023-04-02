import { useState } from "react";
import styles from "./post-create.module.css";
import { createPost } from "../../utils/post.service";

function PostCreate() {
  const [title, setTitle] = useState("");
  console.log({ styles });

  const onCreatePostHandler = async (event) => {
    try {
      console.log("creating post with title ", title);
      const response = await createPost(title);
      console.log({ response });
      setTitle("");
    } catch (err) {}
  };

  const onInputChangeHandler = (event) => {
    console.log({ event });
    const value = event.target.value;
    setTitle(value);
  };

  return (
    <div className={styles.postCreate}>
      <div className="form-group">
        <label htmlFor="post-title">Enter Post Title</label>
        <input
          value={title}
          type="text"
          className="form-control"
          id="post-title"
          placeholder="Enter Post Title Here"
          onChange={onInputChangeHandler}
        />
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={onCreatePostHandler}
        >
          Create Post
        </button>
      </div>
    </div>
  );
}

export default PostCreate;
