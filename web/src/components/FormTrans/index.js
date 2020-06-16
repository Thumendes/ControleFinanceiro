import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { Context } from "../../context/user";

export default ({ close }) => {
  const [transData, setTransData] = useState({
    title: "",
    value: "",
    budgetId: "",
  });
  const [available, setAvailable] = useState(false);
  const { budgets, addTransactions } = useContext(Context);

  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setTransData({ ...transData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransactions(transData);
    close();
  };

  useEffect(() => {
    Object.keys(transData).every((key) => transData[key].length)
      ? setAvailable(true)
      : setAvailable(false);
  }, [transData]);

  return (
    <div className={style.container}>
      <h1>Adicione uma transação</h1>
      <p>Escolha uma carteira e registre uma transação</p>
      <form onSubmit={handleSubmit}>
        <div className={style.formControl}>
          <label htmlFor="title">Qual o Título?</label>
          <input
            type="text"
            name="title"
            value={transData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label htmlFor="value">Qual o valor?</label>
          <input
            type="number"
            name="value"
            value={transData.value}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label htmlFor="value">Qual a carteira?</label>
          <select
            name="budgetId"
            value={transData.budgetId}
            onChange={handleInputChange}
          >
            {budgets.map((budget) => (
              <option key={budget._id} value={budget._id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.formControl}>
          <button disabled={!available}>Registrar</button>
        </div>
      </form>
    </div>
  );
};
