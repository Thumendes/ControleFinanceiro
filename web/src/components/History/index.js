import React, { useContext } from "react";
import { Context } from "../../context/user";
import { FiCalendar } from "react-icons/fi";
import style from "./style.module.css";

export default ({ openModal }) => {
  const { transactions, budgets } = useContext(Context);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <FiCalendar />
          <span>Histórico de transações</span>
        </div>
        <button onClick={openModal}>Adicionar</button>
      </div>
      <ul>
        {transactions.map((transaction) => {
          const { name: budgetName } = budgets.find(
            (budget) => budget._id === transaction.budgetId
          );
          const valueClass =
            transaction.value > 0 ? style.positive : style.negative;
          const date = new Date(transaction.createdAt);
          const dateCreation = `${date.getDate()}/${date.getMonth()} - ${date.getHours()}:${date.getMinutes()}`;
          return (
            <li key={transaction._id}>
              <div>
                <p className={style.title}>{transaction.title}</p>
                <span className={style.budgetName}>{budgetName}</span>
                <span className={style.dateCreation}>{dateCreation}</span>
              </div>
              <span className={`${valueClass} ${style.value}`}>
                {transaction.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
