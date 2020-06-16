import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import { Context } from "../../context/user";
import { Line } from "react-chartjs-2";
import BudgetCharts from "../BudgetCharts";

export default ({ openModal }) => {
  const [data, setData] = useState({
    entradas: 0,
    saidas: 0,
    total: 0,
  });
  const { budgets, transactions } = useContext(Context);

  useEffect(() => {
    if (!transactions.length || !budgets.length) {
      return;
    }
    setData({
      entradas:
        transactions.length !== 1
          ? transactions
              .map((transaction) => transaction.value)
              .filter((value) => value > 0)
              .reduce((prev, curr) => prev + curr)
          : "Registre mais Transações!",
      saidas:
        transactions.length > 2
          ? transactions
              .map((transaction) => transaction.value)
              .filter((value) => value < 0)
              .reduce((prev, curr) => prev + curr)
          : "Registre mais Transações!",
      total:
        transactions.length > 2
          ? budgets
              .map((budget) => budget.value)
              .reduce((prev, curr) => prev + curr) +
            transactions
              .map((transaction) => transaction.value)
              .filter((value) => value < 0)
              .reduce((prev, curr) => prev + curr)
          : budgets[0].value,
    });
  }, [transactions, budgets]);

  return (
    <div className={style.container}>
      <div className={style.cards}>
        <div className={style.card}>
          <h2>Entradas</h2>
          <h1>
            {transactions.length ? data.entradas : "Adicione alguma transação"}
          </h1>
        </div>
        <div className={style.card}>
          <h2>Saídas</h2>
          <h1>
            {transactions.length ? data.saidas : "Adicione alguma transação"}
          </h1>
        </div>
        <div className={style.card}>
          <h2>Total</h2>
          <h1>
            {transactions.length ? data.total : "Adicione alguma transação"}
          </h1>
        </div>
      </div>
      <div className={style.chart}>
        <Line
          data={{
            datasets: [
              {
                label: "Transações ",
                borderColor: "#fa0",
                data: transactions.map((transaction) => transaction.value),
              },
            ],
            labels: transactions.map((transaction) => {
              const date = new Date(transaction.createdAt);
              return `${date.getDate()}/${date.getMonth()}`;
            }),
          }}
        />
      </div>
      <div className={style.budgets}>
        <BudgetCharts openModal={openModal} />
      </div>
    </div>
  );
};
