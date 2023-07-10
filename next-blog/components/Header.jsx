import styles from "./Header.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
const Header = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Link className={styles.logo} href="/">
          Next<span className={styles.span}>Blog</span>
        </Link>
        <nav>
          <ul className={styles.header_links}>
            {!session && (
              <li>
                <Link className={styles.link} href="/login">
                  Login
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link className={styles.link} href="/users">
                  User
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
