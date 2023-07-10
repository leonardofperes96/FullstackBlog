import LoadingSpinner from "@/components/LoadingSpinner";
import NoContent from "@/components/NoContent";
import { useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAllPhotos = async () => {
      setLoading(true);
      const response = await fetch("/api/users/userPosts");
      const data = await response.json();

      setData(data.posts);
      setLoading(false);
    };
    getAllPhotos();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <h1>Cant reach database.</h1>;
  }

  return (
    <>
      <h1>Welcome</h1>
      {data.length === 0 && (
        <NoContent message="No one has posted anything yet." />
      )}

      {/* {data.map((item) => (
        <div key={item._id}>
          <h4>{item.caption}</h4>
          <h4>{item.photoUrl}</h4>
          <h4>{item.hashtags}</h4>
        </div>
      ))} */}
    </>
  );
}
