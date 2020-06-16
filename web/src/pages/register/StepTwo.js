import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { Context } from "../../context/register";

export default ({ prev }) => {
  const [available, setAvailable] = useState(false);
  const {
    stepTwoData,
    setStepTwoData,
    createUser,
    error,
    success,
  } = useContext(Context);

  const handleChangeInput = (event) => {
    setStepTwoData({ ...stepTwoData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    Object.keys(stepTwoData).every((key) => stepTwoData[key].length)
      ? setAvailable(true)
      : setAvailable(false);
  }, [stepTwoData]);

  return (
    <form onSubmit={createUser}>
      <span className={styles.back} onClick={() => prev()}>
        <FiArrowLeft />
        Voltar
      </span>
      <h1 className={styles.formTitle}>Complete os campos</h1>
      <div hidden={!error.length} className={styles.error}>
        {error}
      </div>
      <div hidden={!success.length} className={styles.success}>
        {success}
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="uf">Estado</label>
        <input
          type="text"
          name="uf"
          value={stepTwoData.uf}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          name="city"
          value={stepTwoData.city}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="road">Rua</label>
        <input
          type="text"
          name="road"
          value={stepTwoData.road}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.cardControl}>
        <label htmlFor="numeral">Número</label>
        <input
          autoFocus
          type="text"
          name="numeral"
          value={stepTwoData.numeral}
          onChange={handleChangeInput}
        />
      </div>
      <div className={`${styles.cardControl} ${styles.button}`}>
        <button disabled={!available}>Registrar</button>
      </div>
    </form>
  );
};
