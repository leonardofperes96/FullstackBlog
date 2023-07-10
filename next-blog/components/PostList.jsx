import React from "react";
import Link from "next/link";
import styles from "./PostList.module.css";
import { FaComment, FaTrashAlt, FaRegEdit } from "react-icons/fa";

const PostList = ({ posts, deleteState, setDeleteState }) => {
  const handleDelete = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    setDeleteState(!deleteState);
  };
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <img className={styles.img} src={post.photoUrl} alt={post.caption} />
          <div className={styles.actions}>
            <Link className={styles.link} href={`/single-post/${post._id}`}>
              <FaComment/>
            </Link>
            <Link className={styles.link} href={`/users/post/${post._id}`}>
              <FaRegEdit />
            </Link>
            <button
              className={styles.link}
              onClick={handleDelete.bind(null, post._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
