import UserHeader from "@/components/UserHeader";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { getUser } from "@/utils/db";
import clientPromise from "@/lib/mongodb";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoContent from "@/components/NoContent";
import PostList from "@/components/PostList";

const UserPage = (props) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    const getAllPhotos = async () => {
      setLoading(true);
      const response = await fetch("/api/users/userPosts");
      const data = await response.json();
      const filterUserPosts = data.posts.filter(
        (item) => item.userId === props.user.userId
      );

      setPosts(filterUserPosts);
      setLoading(false);
    };
    getAllPhotos();
  }, [deleteState]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts) {
    return;
  }

  return (
    <div className="page">
      <UserHeader />
      {posts.length === 0 && (
        <NoContent message="You haven't made any posts yet." />
      )}
      <PostList
        posts={posts}
        deleteState={deleteState}
        setDeleteState={setDeleteState}
      />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const client = await clientPromise;

  const user = await getUser(client, "blog", "users", session.user.email);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      user: JSON.parse(JSON.stringify({ userId: user._id })),
    },
  };
}

export default UserPage;
