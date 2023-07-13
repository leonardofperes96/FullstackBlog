import UserHeader from "@/components/UserHeader";
import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { useGetCollections } from "@/hooks/useGetCollections";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUser } from "@/utils/db";
import clientPromise from "@/lib/mongodb";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoContent from "@/components/NoContent";
import PostList from "@/components/PostList";
import Head from "next/head";

const UserPage = (props) => {
  const [deleteState, setDeleteState] = useState(false);
  const { data, loading, error } = useGetCollections(
    "/api/users/userPosts",
    deleteState
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return;
  }

  const filterPosts =
    data && data.posts.filter((post) => post.userId === props.user.userId);

  return (
    <div className="page">
      <UserHeader />
      {filterPosts.length === 0 && (
        <NoContent message="You haven't made any posts yet." />
      )}
      <Head>
        <title>{props.session.user.name || "User Page"}</title>
        <meta name="user-page" content="Users page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostList
        posts={filterPosts}
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

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      user: JSON.parse(JSON.stringify({ userId: user._id })),
    },
  };
}

export default UserPage;
