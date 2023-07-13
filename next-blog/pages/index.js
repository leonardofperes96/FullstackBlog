import HomePosts from "@/components/HomePosts";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoContent from "@/components/NoContent";
import { useGetCollections } from "@/hooks/useGetCollections";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, loading, error } = useGetCollections("/api/users/userPosts");
  const { data: session, status } = useSession();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return;
  }

  return (
    <>
      {data.posts.length === 0 && (
        <NoContent message="No one has posted anything yet." />
      )}
      {data.posts.map((item) => (
        <HomePosts
          key={item._id}
          id={item._id}
          caption={item.caption}
          photoUrl={item.photoUrl}
          username={item.username}
        />
      ))}
    </>
  );
}
