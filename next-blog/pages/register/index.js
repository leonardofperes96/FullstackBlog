import RegisterForm from "@/components/RegisterForm";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const RegisterPage = () => {
  return (
    <>
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
