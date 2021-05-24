import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Navbar.css";
import { signOut } from "../actions/authAction";
import { getShop } from "../actions/shopAction";
class Navbar extends Component {
  componentDidMount() {
    this.props.getShop();
  }
  signOut = () => {
    this.props.signOut();
  };

  render() {
    return (
      <div>
        <header className="navbar navbar-white sticky-top flex-md-nowrap p-0">
          <button
            className="navbar-toggler d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <Link
            className="navbar-brand col-md-3 col-lg-2 me-0 px-3 hide-mobile"
            to="/"
          >
            {this.props.shop.shopname}
          </Link>

          {/* <input
            className="form-control form-control-dark w-50"
            type="text"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <ul className="navbar-nav ">
            <li className="nav-item dropdown user-profile">
              <span
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="far fa-user"></i> <b>{this.props.user.name}</b>
              </span>
              <ul
                className="dropdown-menu dropdown-profile"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/user/profile">
                    My profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/profile">
                    My shop
                  </Link>
                </li>
                <li>
                  <span className="dropdown-item" onClick={this.signOut}>
                    Sign out
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </header>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    shop: state.shop.shopDetail,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { signOut, getShop })(Navbar);
