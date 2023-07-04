import styles from "./Header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Link className={styles.logo} href="/">
          Next<span className={styles.span}>Blog</span>
        </Link>
        <nav>
          <ul className={styles.header_links}>
            <li>
              <Link className={styles.link} href="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className={styles.link} href="/post">
                Post
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/user">
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
