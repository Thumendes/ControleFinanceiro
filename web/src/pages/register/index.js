import React, { useState } from "react";
import styles from "./styles.module.css";
import register from "../../assets/register.svg";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import ContextProvider from "../../context/register";

export default () => {
  const [step, setStep] = useState(0);

  return (
    <ContextProvider>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img src={register} alt="ThuExpense" />
        </div>
        <div className={styles.formContainer}>
          <div hidden={step !== 0}>
            <StepOne next={() => setStep(step + 1)} />
          </div>
          <div hidden={step !== 1}>
            <StepTwo prev={() => setStep(step - 1)} />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};
