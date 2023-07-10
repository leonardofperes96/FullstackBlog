import FormComponent from "./FormComponent";
import styles from "./EditPost.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
const EditPost = ({ url, caption, hashtags }) => {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(url);
  const [photoCaption, setPhotoCaption] = useState(caption);
  const [photoHashtags, setPhotoHashtags] = useState(hashtags);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = router.query.id;

  const handleChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      photoUrl,
      photoCaption,
      photoHashtags,
    };
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.post) {
      setFormError(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setFormError("");
    setPhotoUrl("");
    setPhotoCaption("");
    setPhotoHashtags("");
    router.replace("/users");
  };

  return (
    <div>
      <form onSubmit={handleChange} className={styles.container}>
        <label htmlFor="">Caption</label>
        <FormComponent
          value={photoCaption}
          onChange={(e) => setPhotoCaption(e.target.value)}
        />
        <label htmlFor="">Photo URL</label>
        <FormComponent
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <label htmlFor="">Hashtags</label>
        <FormComponent
          value={photoHashtags}
          onChange={(e) => setPhotoHashtags(e.target.value)}
        />
        <p className="error">{formError}</p>
        <button disabled={loading} className="button">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
