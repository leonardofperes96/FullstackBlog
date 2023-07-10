import styles from "./DropdownComponent.module.css";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";

const DropdownComponent = ({ menu, setMenu }) => {
  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn} onClick={handleMenu}>
        <AiOutlineMenu />
      </button>

      {menu ? (
        <div
          className={
            !menu
              ? styles.dropdown_content
              : `${styles.dropdown_content} ${styles.active}`
          }
        >
          <button>
            <Link className={styles.header_link} href="/users">
              Profile
            </Link>
          </button>
          <button>
            <Link className={styles.header_link} href="/users/post">
              Post
            </Link>
          </button>
          <button onClick={() => signOut()} className={styles.header_link}>
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropdownComponent;
