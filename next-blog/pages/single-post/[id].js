import React from "react";
import { connectDatabase, getCollection } from "@/utils/db";
import SinglePostItem from "@/components/SinglePostItem";

const SinglePost = (props) => {
  const { posts } = props;

  return (
    <>
      <SinglePostItem posts={posts} />
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

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}

export default SinglePost;
