import React, { Component } from "react";
import { connect } from "react-redux";
import { createShopExpense } from "../../actions/shopAction";
import { Field, reduxForm } from "redux-form";

class ShopExpenseCreate extends Component {
  onSubmit = (formValues) => {
    this.props.createShopExpense(formValues);
  };
  render() {
    return (
      <div className="col-md-12 col-sm-12">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3 ">
          <h3>Expenses</h3>
        </div>
        <form
          className="col-md-12"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className="row mb-2">
            <div className="col-md-3 col-sm-12"></div>
            <div className="col-md-4 col-sm-12">
              <Field
                name="subject"
                component="input"
                className="form-control "
                placeholder="Expense Details"
              />
            </div>
            <div className="col-md-3 col-sm-12">
              <Field
                name="amount"
                component="input"
                type="number"
                className="form-control "
                placeholder="Amount"
              />
            </div>

            <div className="col-md-2 col-sm-12 text-end">
              <button type="submit" className="btn btn-primary">
                Add new expense
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { createShopExpense })(
  reduxForm({
    form: "createShopExpense",
  })(ShopExpenseCreate)
);
