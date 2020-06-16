import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useHistory } from "react-router-dom";
import ContextProvider from "../../context/user";
import { Dialog } from "@material-ui/core";

import Navbar from "../../components/Navbar";
import Home from "../../components/Home";
import History from "../../components/History";
import FormTrans from "../../components/FormTrans";
import FormBudget from "../../components/FormBudget";

export default () => {
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    !localStorage.getItem("token") && history.push("/");
  });

  return (
    <ContextProvider>
      <div className={style.container}>
        <Navbar />
        <div className={style.data}>
          <Home openModal={() => setBudgetOpen(true)} />
          <div className={style.history}>
            <History openModal={() => setTransactionOpen(true)} />
          </div>
        </div>
        <Dialog
          open={transactionOpen}
          onClose={() => setTransactionOpen(false)}
        >
          <FormTrans close={() => setTransactionOpen(false)} />
        </Dialog>
        <Dialog open={budgetOpen} onClose={() => setBudgetOpen(false)}>
          <FormBudget close={() => setBudgetOpen(false)} />
        </Dialog>
      </div>
    </ContextProvider>
  );
};
