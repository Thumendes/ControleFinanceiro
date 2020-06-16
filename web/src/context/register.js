import React, { createContext, useState } from "react";
import api from "../api";
import { useHistory } from "react-router-dom";
import { criptografar } from "../utils";

const stepOneDataInitial = {
  name: "",
  email: "",
  cep: "",
  password: "",
};

const stepTwoDataInitial = {
  uf: "",
  city: "",
  road: "",
  numeral: "",
};

export const Context = createContext({});

export default ({ children }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stepOneData, setStepOneData] = useState(stepOneDataInitial);
  const [stepTwoData, setStepTwoData] = useState(stepTwoDataInitial);

  const createUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("user", {
        ...stepOneData,
        ...stepTwoData,
      });
      if (data.success) {
        setError("");
        localStorage.setItem("token", data.token);
        setSuccess("You are now registered");
        setTimeout(() => {
          history.push("/dashboard");
        }, 1500);
        return;
      }

      setError(data.message);
    } catch (err) {
      return history.push(`/error/${criptografar(err)}`);
    }
  };

  return (
    <Context.Provider
      value={{
        success,
        error,
        stepOneData,
        setStepOneData,
        stepTwoData,
        setStepTwoData,
        createUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
