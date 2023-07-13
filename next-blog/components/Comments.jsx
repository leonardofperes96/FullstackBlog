import React from "react";
import styles from "./Comments.module.css";
import { useGetCollections } from "@/hooks/useGetCollections";

import { useRouter } from "next/router";

import { FaTrashAlt } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const Comments = ({ updateComment, userInfo, setUpdateComment }) => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error, loading } = useGetCollections(
    "/api/users/comments",
    updateComment
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return;
  }
  const filterComments =
    data && data.comments.filter((comment) => comment.postId === id);

  const handleDelete = async (id) => {
    const deleteObj = {
      commentId: id,
    };
    const response = await fetch(`/api/users/comments`, {
      method: "DELETE",
      body: JSON.stringify(deleteObj),
    });
    setUpdateComment(!updateComment);
  };

  return (
    <div className={styles.comments_content}>
      <ul className={styles.comments}>
        {filterComments.length === 0 && <h2>No comments yet...</h2>}
        {filterComments.map((comment) => (
          <div className={styles.comments_container} key={comment._id}>
            <div className={styles.comment_info}>
              <b>{comment.username}</b>
              <p>{comment.comment}</p>
            </div>
            {userInfo && userInfo.userId === comment.userId && (
              <button
                onClick={handleDelete.bind(null, comment._id)}
                className={styles.button}
              >
                <FaTrashAlt className={styles.delete} />
              </button>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
