import React, { useState } from "react";
import styles from "./SinglePostItem.module.css";
import { useRouter } from "next/router";
import Comments from "./Comments";
import { post } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SinglePost = ({ posts, userInfo }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const [updateComment, setUpdateComment] = useState(false);

  const router = useRouter();
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      router.back();
    }
  }

  const handleInsertComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (comment.length === 0) {
      return;
    }
    const obj = {
      userId: userInfo.userId,
      username: session.user.name,
      postId: posts._id,
      comment: comment,
    };

    const commentPost = await post("/api/users/comments", obj);

    setComment("");
    setLoading(false);
    setUpdateComment(!updateComment);
  };
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.modal_content}>
        <div className={styles.img}>
          <img src={posts.photoUrl} alt="" />
        </div>
        <div className={styles.details}>
          <h3 className={styles.user}>@{posts.username}</h3>
          <p className={styles.caption}>{posts.caption}</p>
          <p className={styles.hashtags}>{posts.hashtags}</p>
        </div>
        <>
          <Comments
            updateComment={updateComment}
            setUpdateComment={setUpdateComment}
            userInfo={userInfo}
          />
          <form onSubmit={handleInsertComment} className={styles.modal_form}>
            <input
              className={styles.input}
              placeholder="Post a comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!session}
            />
            {session ? (
              <button
                className={styles.btn}
                disabled={
                  loading || comment.length === 0 || comment.trim() === ""
                }
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </form>
        </>
      </div>
    </div>
  );
};

export default SinglePost;
