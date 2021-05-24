import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import getPageInfo from "./Page";

import "./Sidebar.css";
import ToggleMenu from "./ToggleMenu";

const Sidebar = () => {
  const currentPageID = getPageInfo(history.location.pathname);
  const salesPages = [2, 3, 4, 5];
  const orderPages = [6, 7, 8, 9];
  const productPages = [10, 11, 12, 13, 14];
  const userPages = [17, 18, 21, 22, 23];
  const ContactPages = [26, 19, 20];

  const [isSalesCollapsed, setSalesCollapsed] = useState(
    salesPages.includes(currentPageID)
  );
  const [isOrderCollapsed, setOrderCollapsed] = useState(
    orderPages.includes(currentPageID)
  );
  const [isProductCollapsed, setProductCollapsed] = useState(
    productPages.includes(currentPageID)
  );
  const [isUserCollapsed, setUserCollapsed] = useState(
    userPages.includes(currentPageID)
  );
  const [isContactCollapsed, setContactCollapsed] = useState(
    ContactPages.includes(currentPageID)
  );

  const toggleSales = () => setSalesCollapsed(!isSalesCollapsed);
  const toggleOrder = () => setOrderCollapsed(!isOrderCollapsed);
  const toggleProduct = () => setProductCollapsed(!isProductCollapsed);
  const toggleUser = () => setUserCollapsed(!isUserCollapsed);
  const toggleContact = () => setContactCollapsed(!isContactCollapsed);

  return (
    <nav
      id="sidebarMenu"
      className="col-md-2 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/dashboard"
            >
              <i className="fas fa-tachometer-alt"> </i> Dashboard
            </Link>
          </li>
          <ToggleMenu
            id="Contacts"
            title="Contacts"
            fontclass="fas fa-id-card-alt"
            isCollapsed={isContactCollapsed}
            toggle={toggleContact}
            items={[
              { title: "Add Contact", link: "/user/contactcreate" },
              { title: "Customer List", link: "/user/all/customer" },
              { title: "Vendor List", link: "/user/all/vendor" },
            ]}
          />

          <ToggleMenu
            id="sales"
            title="Sales"
            fontclass="fas fa-shopping-cart"
            isCollapsed={isSalesCollapsed}
            toggle={toggleSales}
            items={[
              { title: "New Sale", link: "/sales/create" },
              { title: "Sales list", link: "/sales/all" },
              { title: "Due List", link: "/sales/due/all" },
            ]}
          />

          <ToggleMenu
            id="order"
            title="Purchase"
            fontclass="fas fa-money-check-alt"
            isCollapsed={isOrderCollapsed}
            toggle={toggleOrder}
            items={[
              { title: "New Order", link: "/order/create" },
              { title: "Orders list", link: "/order/all" },
              { title: "Due List", link: "/order/due/all" },
            ]}
          />

          <ToggleMenu
            id="product"
            title="Product"
            fontclass="fas fa-luggage-cart"
            isCollapsed={isProductCollapsed}
            toggle={toggleProduct}
            items={[
              { title: "Add Product", link: "/product/create" },
              { title: "Stock", link: "/product/all" },
              { title: "Move Product", link: "/product/move" },
              { title: "Product Move History", link: "/product/move/history" },
            ]}
          />

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/warehouse/all">
                <span data-feather="file-text"></span>
                <i className="fas fa-warehouse"></i> Warehouse
              </Link>
            </li>
          </ul>

          <ToggleMenu
            id="users"
            title="Users"
            fontclass="fas fa-users-cog"
            isCollapsed={isUserCollapsed}
            toggle={toggleUser}
            items={[
              { title: "Add User", link: "/user/create" },
              { title: "Manager List", link: "/user/all/manager" },
              { title: "Salesman List", link: "/user/all/salesman" },
            ]}
          />
        </ul>

        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="/shop/expense">
              <span data-feather="file-text "></span>
              <i className="fas fa-comments-dollar"></i> Expense
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Reports</span>
          <Link className="link-secondary" to="/" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="/reports/purchase">
              <span data-feather="file-text"></span>
              Puchase Report
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports/selling">
              <span data-feather="file-text"></span>
              Sales Report
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
