import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>NextBlog</title>
          <meta
            name="description"
            content="A blog to interact with other users"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
