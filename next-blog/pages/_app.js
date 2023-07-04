import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
