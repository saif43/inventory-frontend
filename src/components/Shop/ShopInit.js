import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createShop } from "../../actions/shopAction";

class ShopInit extends Component {
  onSubmit = (formValues) => {
    this.props.createShop(formValues);
  };

  render() {
    return (
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Create Shop</h1>
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="row g-3 col-md-6"
        >
          <div>
            <label className="form-label">Shop Name</label>
            <Field
              name="shopname"
              component="input"
              className="form-control"
              placeholder="Shop Name"
            />
          </div>
          <div>
            <label className="form-label">Shop money</label>
            <Field
              name="money"
              component="input"
              type="number"
              className="form-control"
              placeholder="0"
            />
          </div>
          <div>
            <button className="btn btn-success">Next</button>
          </div>
        </form>
      </main>
    );
  }
}

export default connect(null, { createShop })(
  reduxForm({
    form: "shopInit",
  })(ShopInit)
);
