import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="admin"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="admin"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
