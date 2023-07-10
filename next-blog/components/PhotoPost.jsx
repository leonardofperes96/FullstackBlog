import React, { useState } from "react";
import FormComponent from "./FormComponent";
import styles from "./PhotoPost.module.css";
import { post } from "@/utils/api";
import { useRouter } from "next/router";
const PhotoPost = ({ user }) => {
  const [caption, setCaption] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      caption,
      photoUrl,
      hashtags,
      username: user.name,
    };

    /* validate */
    const userPost = await post("/api/users/userPosts", obj);
    if (!userPost.post) {
      setFormError(userPost.message);
      setLoading(false);
      return;
    }

    setCaption("");
    setPhotoUrl("");
    setHashtags("");
    setFormError("");
    setLoading(false);
    router.replace("/users");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label htmlFor="">Caption</label>
        <FormComponent
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label htmlFor="">Photo URL</label>
        <FormComponent
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <label htmlFor="">Hashtags</label>
        <FormComponent
          type="text"
          placeholder="Ex: #coding #react"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <p className="error">{formError}</p>
        <button disabled={loading} className="button">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PhotoPost;
