import React, { useContext, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Context } from "../../context/user";
import style from "./style.module.css";

export default ({ openModal }) => {
  const [budgetData, setBudgetData] = useState([]);
  const { budgets, transactions } = useContext(Context);

  useEffect(() => {
    if (!budgets.length || !transactions.length) {
      return;
    }
    const budgetsArray = budgets.map((budget) => {
      const transactionsTotal = transactions
        .filter((transaction) => transaction.budgetId === budget._id)
        .map((transaction) => transaction.value)
        .filter((value) => value < 0);
      return {
        name: budget.name,
        key: budget._id,
        budgetTotal: budget.value,
        transactionsTotal: transactionsTotal.length
          ? transactionsTotal.reduce((prev, curr) => prev + curr)
          : 0,
      };
    });
    setBudgetData(budgetsArray);
  }, [transactions, budgets]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Carteiras</h1>
        <button onClick={openModal}>Adicionar</button>
      </div>
      <div className={style.donuts}>
        {budgetData.map((values) => {
          const data = {
            datasets: [
              {
                data: [values.transactionsTotal, values.budgetTotal],
                backgroundColor: ["#fa0", "#eee"],
              },
            ],
            labels: ["Usado", "Sobrando"],
          };
          return (
            <div key={values.key} className={style.donutWraper}>
              <h2>{values.name}</h2>
              <Doughnut
                options={{
                  legend: { display: false },
                }}
                data={data}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
