import PhotoPost from "@/components/PhotoPost";
import UserHeader from "@/components/UserHeader";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const PostPage = (props) => {
 
  return (
    <div className="page">
      <UserHeader />
      <PhotoPost user={props.session.user}/>
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

  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
}

export default PostPage;
