import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/users",
      },
    };
  }
  return { props: {} };
}
export default LoginPage;
