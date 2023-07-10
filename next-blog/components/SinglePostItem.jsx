import React from "react";
import styles from "./SinglePostItem.module.css";
const SinglePost = ({ posts }) => {
  return (
    <div className={styles.post_container}>
      <div className={styles.post}>
        <div className={styles.post_header}>
          <h2>@ {posts.username}</h2>
        </div>
        <div className={styles.post_image}>
          <img src={posts.photoUrl} alt={posts.caption} />
        </div>
        <div className={styles.body}>
          <p>
            {posts.username} : <span>{posts.caption}</span>
          </p>
          <p>{posts.hashtags}</p>
        </div>
        {/* comments, postComment...*/}
      </div>
    </div>
  );
};

export default SinglePost;
