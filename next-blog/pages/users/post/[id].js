import EditPost from "@/components/EditPost";
import UserHeader from "@/components/UserHeader";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDatabase, getCollection } from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
const EditPostPage = (props) => {
  const router = useRouter();
  const postId = router.query.id;
  const { posts } = props;

  return (
    <>
      <UserHeader />
      {posts && (
        <EditPost
          url={posts.photoUrl}
          caption={posts.caption}
          hashtags={posts.hashtags}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const session = await getServerSession(req, res, authOptions);
  const id = params.id;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const client = await connectDatabase();

  if (!client) {
    return;
  }

  const posts = await getCollection(client, "blog", "posts", id);

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}

export default EditPostPage;
