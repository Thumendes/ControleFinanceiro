import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/register";
import InputMask from 'react-input-mask';
import axios from "axios";

export default ({ next }) => {
  const {
    stepOneData,
    setStepOneData,
    setStepTwoData,
    stepTwoData,
  } = useContext(Context);
  const [available, setAvailable] = useState(false);

  const handleChangeInput = (event) => {
    setStepOneData({ ...stepOneData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${stepOneData.cep.replace('-', '')}/json/`
    );
    setStepTwoData({
      ...stepTwoData,
      uf: data.uf,
      road: data.logradouro,
      city: data.localidade,
    });
    next();
  };

  useEffect(() => {
    Object.keys(stepOneData).every((key) => stepOneData[key].length)
      ? setAvailable(true)
      : setAvailable(false);
  }, [stepOneData]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className={styles.formTitle}>Cadastre-se</h1>
      <div className={styles.cardControl}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={stepOneData.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={stepOneData.email}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="cep">CEP</label>
        <InputMask
          mask="99999-999"
          onChange={handleChangeInput}
          value={stepOneData.cep}
          name="cep">
          {inputProps => (
            <input
              {...inputProps}
              type="text"
            />
          )}
        </InputMask>
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          value={stepOneData.password}
          onChange={handleChangeInput}
        />
      </div>
      <div className={`${styles.cardControl} ${styles.button}`}>
        <button disabled={!available}>Continuar</button>
      </div>
      <div className={styles.signUp}>
        <span>
          Você tem uma conta? <Link to="/login">Entrar</Link>
        </span>
      </div>
    </form>
  );
};
