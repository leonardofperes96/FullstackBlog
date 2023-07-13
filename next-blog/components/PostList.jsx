import React, { useState } from "react";
import Link from "next/link";
import styles from "./PostList.module.css";
import { FaComment, FaTrashAlt, FaRegEdit } from "react-icons/fa";

const PostList = ({ posts, deleteState, setDeleteState }) => {
  const [alert, setAlert] = useState(false);

  const deleteItem = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    setDeleteState(!deleteState);
  };

  const toggleAlert = () => {
    setAlert(!alert);
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <div className={styles.img_container}>
            <img
              className={styles.img}
              src={post.photoUrl}
              alt={post.caption}
            />
          </div>

          <div className={styles.actions}>
            {!alert && (
              <>
                <Link className={styles.link} href={`/single-post/${post._id}`}>
                  <FaComment />
                </Link>
                <Link className={styles.link} href={`/users/post/${post._id}`}>
                  <FaRegEdit />
                </Link>
                <button className={styles.link} onClick={toggleAlert}>
                  <FaTrashAlt />
                </button>
              </>
            )}
            {alert && (
              <div className={styles.alert}>
                <h4>Are you sure you want to delete this post?</h4>
                <button className={styles.delete} onClick={deleteItem.bind(null, post._id)}>Yes</button>
                <button className={styles.no}onClick={toggleAlert}>No</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
