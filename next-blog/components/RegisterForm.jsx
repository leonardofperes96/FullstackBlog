import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { registerUser } from "@/utils/api";
import FormComponent from "./FormComponent";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      username,
      email,
      password,
    };

    const data = await registerUser("/api/auth/register", user);
    if (!data.user) {
      setFormError(data.message);
      setLoading(false);
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setFormError("");
    setLoading(false);
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
        <FormComponent
          name="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className={styles.options}>
          Already registered? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
