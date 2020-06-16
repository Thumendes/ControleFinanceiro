import React from "react";
import { FaUserAlt } from "react-icons/fa";
import style from "./style.module.css";

export default () => {
  const user = {
    image: "",
    name: "Arthur Mendes",
  };
  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <h3>ThuExpense</h3>
      </div>
      <ul className={style.menu}>
        <li>
          <a href="/">Help</a>
        </li>
        <li>
          {user.image.length ? (
            <img className={style.avatar} src={user.image} alt={user.name} />
          ) : (
            <FaUserAlt />
          )}
        </li>
      </ul>
    </nav>
  );
};
