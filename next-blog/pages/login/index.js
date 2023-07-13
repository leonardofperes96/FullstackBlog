import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";
const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="login" content="Users login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
