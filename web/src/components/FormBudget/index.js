import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { Context } from "../../context/user";

export default ({ close }) => {
  const [budgetData, setBudgetData] = useState({
    name: "",
    value: "",
  });
  const [available, setAvailable] = useState(false);
  const { addBudgets } = useContext(Context);

  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudgets(budgetData);
    close();
  };

  useEffect(() => {
    Object.keys(budgetData).every((key) => budgetData[key].length)
      ? setAvailable(true)
      : setAvailable(false);
  }, [budgetData]);

  return (
    <div className={style.container}>
      <h1>Adicione uma Carteira</h1>
      <p>Digite o valor e o nome para criar uma carteira</p>
      <form onSubmit={handleSubmit}>
        <div className={style.formControl}>
          <label htmlFor="name">Qual o Nome?</label>
          <input
            type="text"
            name="name"
            value={budgetData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label htmlFor="value">Qual o valor?</label>
          <input
            type="number"
            name="value"
            value={budgetData.value}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <button disabled={!available}>Registrar</button>
        </div>
      </form>
    </div>
  );
};
