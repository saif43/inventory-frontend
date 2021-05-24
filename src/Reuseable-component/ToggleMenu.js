import React from "react";
import { Link } from "react-router-dom";

const ToggleMenu = ({ title, fontclass, isCollapsed, toggle, items }) => {
  const renderItems = (items) => {
    return items.map((item) => {
      return (
        <li key={item.title}>
          <Link className="dropdown-item" to={item.link}>
            {item.title}
          </Link>
        </li>
      );
    });
  };

  return (
    <li className="dropend">
      <span
        className="nav-link dropdown-toggle"
        id="navbarDarkDropdownMenuLink"
        aria-expanded="true"
        onClick={() => toggle()}
      >
        <i className={`${fontclass}`}></i> {title}
      </span>
      <ul
        className={
          isCollapsed
            ? `dropdown-menu dropdown-menu-dark show`
            : "dropdown-menu dropdown-menu-dark"
        }
        aria-labelledby="navbarDarkDropdownMenuLink"
        style={{
          margin: "0px",
          position: "inherit",
          inset: "0px auto auto 0px",
        }}
        data-popper-placement="right-start"
      >
        {renderItems(items)}
      </ul>
    </li>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     currentPage: state.sidebar.selectedPage,
//   };
// };

export default ToggleMenu;
