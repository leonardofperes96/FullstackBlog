import React from "react";
import { connectDatabase, getCollection, getUser } from "@/utils/db";
import SinglePostItem from "@/components/SinglePostItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

const SinglePost = (props) => {
  const { posts, userInfo } = props;

  return (
    <>
      <Head>
        <title>{posts.caption || "Post Title"}</title>
        <meta name="single-post" content={posts.caption || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SinglePostItem posts={posts} userInfo={userInfo} />
    </>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const id = params.id;

  const client = await connectDatabase();
  if (!client) {
    return;
  }
  const posts = await getCollection(client, "blog", "posts", id);

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  }

  const user = await getUser(client, "blog", "users", session.user.email);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      userInfo: JSON.parse(JSON.stringify({ userId: user._id })),
    },
  };
}

export default SinglePost;
