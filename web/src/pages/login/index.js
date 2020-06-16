import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import api from "../../api";
import GoogleLogin from "react-google-login";
import { criptografar } from "../../utils";

export default () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    Object.keys(userData).every((key) => userData[key].length)
      ? setAvailable(true)
      : setAvailable(false);
  }, [userData]);

  const handleGoogleLogin = (res) => {};

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth", userData);

      if (data.success) {
        setError("");
        localStorage.setItem("token", data.token);
        setSuccess("You are now registered");
        setTimeout(() => {
          history.push("/dashboard");
        }, 1500);
        return;
      }

      setError(data.message);
    } catch (err) {
      return history.push(`/error/${criptografar(err)}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleLogin}>
          <span className={styles.title}>Faça Login</span>
          <div hidden={!error.length} className={styles.error}>
            {error}
          </div>
          <div hidden={!success.length} className={styles.success}>
            {success}
          </div>
          <div className={styles.cardControl}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChangeInput} />
          </div>
          <div className={styles.cardControl}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              onChange={handleChangeInput}
            />
          </div>
          <div className={`${styles.cardControl} ${styles.button}`}>
            <button disabled={!available}>Entrar</button>
          </div>
          <div className={styles.google}>
            <span>ou</span>
            <GoogleLogin
              clientId="906683499752-fkr11v03q7qbgslm4srar0ql2t9pk800.apps.googleusercontent.com"
              buttonText="Entrar com Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
            />
          </div>
        </form>
        <div className={styles.signUp}>
          <span>
            Você tem uma conta? <Link to="/register">Crie uma</Link>
          </span>
        </div>
      </div>
      <footer>
        <span>Thumendess</span>
      </footer>
    </div>
  );
};
