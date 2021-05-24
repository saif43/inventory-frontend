import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import {
  GetAllShopExpense,
  deleteExpense,
  updateExpense,
} from "../../actions/shopAction";
import Helmet from "react-helmet";
import dateformat from "dateformat";
import ShopExpenseCreate from "./ShopExpenseCreate";

class ShopExpense extends Component {
  state = { selectedExpense: null, updatedSubject: "", updatedAmount: 0 };
  componentDidMount() {
    this.props.GetAllShopExpense();
  }

  trigger = () => {
    this.props.GetAllShopExpense();
  };

  update = () => {
    let updateset = {
      subject: this.state.updatedSubject,
      amount: this.state.updatedAmount,
    };
    this.props.updateExpense(this.state.selectedExpense, updateset);
    this.setState({ selectedExpense: null });
    this.props.GetAllShopExpense();
  };

  onDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirm) {
      this.props.deleteExpense(id);
    }
  }

  renderSubject(id, subject) {
    if (id === this.state.selectedExpense) {
      return (
        <td>
          <input
            className="form-control"
            onChange={(e) => this.setState({ updatedSubject: e.target.value })}
            value={this.state.updatedSubject}
            type="text"
          />
        </td>
      );
    }

    return <td className="table-row-td">{subject}</td>;
  }

  renderAmount(id, amount) {
    if (id === this.state.selectedExpense) {
      return (
        <td>
          <input
            className="form-control"
            onChange={(e) => this.setState({ updatedAmount: e.target.value })}
            value={this.state.updatedAmount}
            type="text"
          />
        </td>
      );
    }

    return <td className="table-row-td">{amount}</td>;
  }

  renderButton(id, subject, amount) {
    if (id === this.state.selectedExpense) {
      return (
        <button className=" btn btn-primary" onClick={(e) => this.update()}>
          Save
        </button>
      );
    }

    return (
      <>
        <span
          className="nav-link "
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </span>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <span
              className="dropdown-item"
              onClick={() =>
                this.setState({
                  selectedExpense: id,
                  updatedSubject: subject,
                  updatedAmount: amount,
                })
              }
            >
              Edit
            </span>
          </li>
          <li>
            <span className="dropdown-item" onClick={() => this.onDelete(id)}>
              Delete
            </span>
          </li>
        </ul>
      </>
    );
  }

  renderExpenses() {
    if (this.props.expense) {
      return this.props.expense.map((expense) => {
        return (
          <tr key={expense.id} className="table-row">
            {this.renderSubject(expense.id, expense.subject)}
            {this.renderAmount(expense.id, expense.amount)}
            <td className="table-row-td">
              {dateformat(expense.created_timestamp, "mmmm dS, yyyy")}
            </td>
            <td className="table-row-td">
              {dateformat(expense.created_timestamp, "h:MM TT")}
            </td>
            <td className="table-row-td">
              {dateformat(expense.modified_timestamp, "mmmm dS")}
            </td>
            <td>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  {this.renderButton(
                    expense.id,
                    expense.subject,
                    expense.amount
                  )}
                </li>
              </ul>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Expenses</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <ShopExpenseCreate />
          </div>
          <div className="row main-body">
            <div className="col-md-12 col-sm-12 p-2 gol-border">
              <table className="table table-sm text-center">
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Last modified</th>
                    <th>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderExpenses()}</tbody>
              </table>
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  if (state.shop.shopExpenselist) {
    return {
      expense: Object.values(state.shop.shopExpenselist),
    };
  }
};

export default connect(mapStateToProps, {
  GetAllShopExpense,
  deleteExpense,
  updateExpense,
})(ShopExpense);
