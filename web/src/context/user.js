import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const Context = createContext({});

export default ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchBudgets = async () => {
    const { data } = await api.get(`/budget/${localStorage.getItem("token")}`);
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    const { data } = await api.get(
      `/transaction/${localStorage.getItem("token")}`
    );
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  const addTransactions = async (values) => {
    await api.post(`/transaction`, {
      ...values,
      token: localStorage.getItem("token"),
    });
    fetchTransactions();
  };

  const addBudgets = async (values) => {
    await api.post(`/budget`, {
      ...values,
      token: localStorage.getItem("token"),
    });
    fetchBudgets();
  };
  return (
    <Context.Provider
      value={{ budgets, transactions, addTransactions, addBudgets }}
    >
      {children}
    </Context.Provider>
  );
};
