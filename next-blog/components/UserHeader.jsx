import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import styles from "./UserHeader.module.css";
import DropdownComponent from "./DropdownComponent";

const UserHeader = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState("");
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    // Adiciona um listener de evento para detectar alterações no tamanho da janela
    window.addEventListener("resize", handleResize);

    // Executa a função de tratamento inicial para definir o estado inicial
    handleResize();

    // Remove o listener de evento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    if (router.pathname === "/users") {
      setTitle(`Welcome, ${session ? session.user.name : ""}`);
    }

    if (router.pathname === "/users/post") {
      setTitle("Post your photo now");
    }

    if (router.pathname === "/users/post/[id]") {
      setTitle("Edit your post now");
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h2 className={styles.header_title}>{title}</h2>
        {isSmallScreen && <DropdownComponent setMenu={setMenu} menu={menu} />}
        {!isSmallScreen && (
          <div className={styles.icons}>
            <Link className={styles.header_link} href="/users">
              <FaUserAlt />
            </Link>
            <Link className={styles.header_link} href="/users/post">
              <FaPlus />
            </Link>
            <Link
              onClick={() => signOut()}
              className={styles.header_link}
              href="/"
            >
              <FaSignOutAlt />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
