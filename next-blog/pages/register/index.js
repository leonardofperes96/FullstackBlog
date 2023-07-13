import RegisterForm from "@/components/RegisterForm";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register Page</title>
        <meta name="register" content="User Register Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterForm />
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

export default RegisterPage;
