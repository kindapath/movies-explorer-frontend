import "./Menu.css";
import { Link } from "react-router-dom";
import AccountLink from "../AccountLink/AccountLink";

const Menu = ({ menuActive, handleMenuClick }) => {
  const items = [
    {
      title: "Главная",
      to: "/",
    },
    {
      title: "Фильмы",
      to: "/movies",
    },
    {
      title: "Сохраненные фильмы",
      to: "/saved-movies",
    },
  ];

  return (
    <div
      className={menuActive ? "menu menu_active" : "menu"}
      onClick={handleMenuClick}
    >
      <div
        className={menuActive ? "menu__blur menu__blur_active" : "menu__blur"}
      />

      <div className="menu__content" onClick={(e) => e.stopPropagation()}>
        <ul className="menu__list">
          {items.map((item, index) => (
            <li key={index}>
              <Link className="menu__link" to={item.to}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <AccountLink />
      </div>
    </div>
  );
};

export default Menu;
