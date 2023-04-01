import { useState } from "react";
import { createComment } from "../../utils/comments.service";
import styles from "./comment-create.module.css";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const createCommentHandler = async () => {
    const comment = await createComment(postId, content);
    setContent("");
  };
  return (
    <div className={styles.commentCreate}>
      <div className="form-group">
        <label htmlFor="comment">Write Comment</label>
        <input
          type="text"
          className="form-control form-control-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm mt-2"
          onClick={createCommentHandler}
        >
          Create Comment
        </button>
      </div>
    </div>
  );
}

export default CommentCreate;
