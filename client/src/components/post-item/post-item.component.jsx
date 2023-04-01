import { useState, useEffect } from "react";
import { fetchComments } from "../../utils/comments.service";
import CommentCreate from "../comment-create/comment-create.component";
import CommentItem from "../comment-item/comment-item.component";
import styles from "./post-item.module.css";

function PostItem({ title, id, comments }) {
  //   const [comments, setComments] = useState([]);
  useEffect(() => {
    // fetchComments(id).then((responseComments) => {
    //   setComments(responseComments);
    // });
  }, []);
  return (
    <div className={styles["post-item"]}>
      <div className="card">
        <div className="card-header">
          <h3 className={styles.title}>{title}</h3>
          <small>There are {comments.length} comments</small>
        </div>
        <div className="card-body">
          <CommentCreate postId={id} />
        </div>
        <div className="card-body">
          <div className={styles.comments}>
            {comments.map((com) => (
              <CommentItem
                key={com.id}
                content={com.content}
                status={com.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
