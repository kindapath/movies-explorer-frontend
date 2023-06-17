import { useState } from "react";
import "./Menu.css";

const Menu = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <button onClick={handleMenuClick} className="menu">
      <div className="menu__lines">
        <span
          className={`menu__line menu__line-1 ${
            isMenuOpen ? "menu__line-1_open" : "menu__line-1_close"
          }`}
        ></span>
        <span
          className={`menu__line menu__line-2 ${
            isMenuOpen ? "menu__line-2_open" : "menu__line-2_close"
          }`}
        ></span>
        <span
          className={`menu__line menu__line-3 ${
            isMenuOpen ? "menu__line-3_open" : "menu__line-3_close"
          }`}
        ></span>
      </div>
    </button>
  );
};

export default Menu;
