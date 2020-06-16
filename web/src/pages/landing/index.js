import React from "react";
import style from "./style.module.css";
import { FiArrowRight } from "react-icons/fi";
import landing from "../../assets/landing.svg";
import { Link } from "react-router-dom";

const Waves = () => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#f90"
        fillOpacity="0.5"
        d="M0,256L34.3,224C68.6,192,137,128,206,122.7C274.3,117,343,171,411,202.7C480,235,549,245,617,240C685.7,235,754,213,823,218.7C891.4,224,960,256,1029,256C1097.1,256,1166,224,1234,208C1302.9,192,1371,192,1406,192L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
      ></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#fa0"
        fillOpacity="0.5"
        d="M0,288L34.3,277.3C68.6,267,137,245,206,240C274.3,235,343,245,411,256C480,267,549,277,617,240C685.7,203,754,117,823,122.7C891.4,128,960,224,1029,266.7C1097.1,309,1166,299,1234,293.3C1302.9,288,1371,288,1406,288L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
      ></path>
    </svg>
  </>
);

export default () => {
  return (
    <div className={style.container}>
      <Waves />
      <nav>
        <h1>ThuExpense</h1>
        <ul>
          <li>
            <a href="/">Sobre</a>
          </li>
          <li>
            <a href="/">Produtos</a>
          </li>
          <li>
            <a href="/">Contato</a>
          </li>
        </ul>
        <Link to="/login" className={style.dashboard}>
          <FiArrowRight />
          DashBoard
        </Link>
      </nav>
      <main>
        <div className={style.intro}>
          <h1 className={style.title}>Lorem ipsum dolor sit amet.</h1>
          <p className={style.text}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quasi
            at veniam dolor suscipit, aliquam labore est magni. Esse assumenda
            adipisci illo. Voluptate reiciendis necessitatibus quos,
            exercitationem sunt fugiat recusandae?
          </p>
          <div className={style.buttons}>
            <Link to="/register" className={style.link}>
              Registre-se
            </Link>
            <Link to="/login" className={style.link}>
              Entrar
            </Link>
          </div>
        </div>
        <div className={style.img}>
          <img src={landing} alt="ThuExpense" />
        </div>
      </main>
    </div>
  );
};
