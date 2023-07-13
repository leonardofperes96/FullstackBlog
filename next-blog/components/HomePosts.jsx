import React from "react";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import styles from "./HomePosts.module.css";

const HomePosts = ({ id, username, photoUrl, caption }) => {
  return (
    
      <div className={styles.posts}>
        <h3>@{username}</h3>
        <img src={photoUrl} alt={caption} />
        <div className={styles.icons}>
          <p><b>{username}</b> {caption}</p>
          <Link href={`/single-post/${id}`}>
            <FaComment />
          </Link>
        </div>
      </div>
 
  );
};

export default HomePosts;
