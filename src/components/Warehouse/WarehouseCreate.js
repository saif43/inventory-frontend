import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createWarehouse } from "../../actions/warehouseAction";

class WarehouseCreate extends Component {
  state = { createwarehouse: "false" };
  onSubmit = (formValues) => {
    this.props.createWarehouse(formValues);
    this.setState({ createwarehouse: "false" });
  };

  addForm() {
    if (this.state.createwarehouse === "false") {
      this.setState({ createwarehouse: "true" });
    } else {
      this.setState({ createwarehouse: "false" });
    }
  }

  buttonState() {
    if (this.state.createwarehouse === "false") {
      return (
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={(e) => this.setState({ createwarehouse: "true" })}
          >
            Add a new warehouse
          </button>
        </div>
      );
    }
    return (
      <form
        className="col-md-12"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="row">
          <div className="col-md-4 col-sm-12"></div>
          <div className="col-md-6 col-sm-12">
            <Field
              component="input"
              name="name"
              className="form-control"
              placeholder="Warehouse Name"
            />
          </div>
          <div className="col-md-1 col-sm-12 text-end">
            <button className="btn btn-success">Submit</button>
          </div>
          <div className="col-md-1 col-sm-12 text-end">
            <button className="btn btn-danger" onClick={() => this.addForm}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="col-md-12 col-sm-12">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
          <h3>Warehouse </h3>
        </div>
        {this.buttonState()}
      </div>
    );
  }
}

export default connect(null, { createWarehouse })(
  reduxForm({
    form: "warehouseCreate",
  })(WarehouseCreate)
);
