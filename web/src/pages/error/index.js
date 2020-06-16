import React from "react";
import style from "./style.module.css";
import error from "../../assets/error.svg";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { descriptografar } from "../../utils";

export default () => {
  const { err } = useParams();

  return (
    <div className={style.container}>
      <Link to="/">
        <FiArrowLeft />
        Voltar
      </Link>
      <img src={error} alt="Error" />
      <h1>Opps...</h1>
      <span>Ocorreu um erro no Sistema!</span>
      <span>Por favor tente novamente</span>
      <pre>{JSON.stringify(descriptografar(err), null, 1)}</pre>
    </div>
  );
};


