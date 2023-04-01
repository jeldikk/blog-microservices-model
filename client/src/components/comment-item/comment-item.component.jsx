import styles from "./comment-item.module.css";

function CommentItem({ content, status }) {
  if (status === "pending") {
    return (
      <div className={styles.pendingCommentItem}>
        Your comment is still pending
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div className={styles.rejectedCommentItem}>Your comment is rejected</div>
    );
  } else {
    return <div className={styles.commentItem}>{content}</div>;
  }
}

export default CommentItem;
