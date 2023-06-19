import './MenuButton.css'


const MenuButton = ({ menuActive, handleMenuClick }) => {

  return (
    <button onClick={handleMenuClick} className="menu-btn">
      <div className="menu-btn__lines">
        <span
          className={`menu-btn__line menu-btn__line-1 ${menuActive ? "menu-btn__line-1_open" : "menu-btn__line-1_close"
            }`}
        ></span>
        <span
          className={`menu-btn__line menu-btn__line-2 ${menuActive ? "menu-btn__line-2_open" : "menu-btn__line-2_close"
            }`}
        ></span>
        <span
          className={`menu-btn__line menu-btn__line-3 ${menuActive ? "menu-btn__line-3_open" : "menu-btn__line-3_close"
            }`}
        ></span>
      </div>
    </button>

  );
};

export default MenuButton;

