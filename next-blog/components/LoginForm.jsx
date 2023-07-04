import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import FormComponent from "./FormComponent";
import { useRouter } from "next/router";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result.error !== null) {
      setFormError(result.error);
      setLoading(false);
      return;
    }

    router.replace("/user");
    setEmail("");
    setPassword("");
    setFormError("");
    setLoading(false);
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        <FormComponent
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormComponent
          name="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{formError}</p>

        <button disabled={loading} className={`button ${styles.button_width}`}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p className={styles.options}>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
