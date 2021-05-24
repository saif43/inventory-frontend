import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { createUser } from "./../../actions/userAction";
import Animation from "../../Reuseable-component/Animation";
// ref: https://redux-form.com/8.3.0/examples/simple/

class UserCreate extends Component {
  state = { userType: "" };

  renderForms(userType) {
    if (userType) {
      const title =
        userType.slice(0, 1).toUpperCase() +
        userType.slice(1, userType.length) +
        " name";

      return (
        <div className="row">
          <div className="mb-2 col-md-6">
            <label className="form-label">{title}</label>

            <Field
              name="name"
              component="input"
              type="text"
              className="form-control niche_border"
            />
          </div>
          <div className="mb-2 col-md-6">
            <label className="form-label">Contact</label>
            <Field
              name="contact"
              component="input"
              type="number"
              className="form-control niche_border"
            />
          </div>
          <div className="mb-2 col-md-6">
            <label className="form-label">Company Name</label>
            <Field
              name="company"
              component="input"
              type="text"
              className="form-control niche_border"
            />
          </div>
          <div className="mb-2 col-md-6">
            <label className="form-label">Address</label>
            <Field
              name="Address"
              component="input"
              type="text"
              className="form-control niche_border"
            />
          </div>
          <div>
            <button className="btn btn-primary mt-3">Submit</button>
          </div>
        </div>
      );
    }
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues);
  };

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Create Contact</title>
        </Helmet>
        <Animation>
          <main className="col-md-9 ms-sm-auto col-lg-10 ">
            <div className="row mb-3">
              <div className="col-md-12 col-sm-12">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                  <h3>Add new contact</h3>
                </div>
              </div>
            </div>
            <div className="row p-2 main-body">
              <div className="col-md-12">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <div>
                    <label className="form-label">Contact type</label>
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <div className="form-check">
                          <label>
                            <Field
                              name="usertype"
                              component="input"
                              type="radio"
                              value="customer"
                              className="form-check-input"
                              onChange={(e) =>
                                this.setState({ userType: e.target.value })
                              }
                            />{" "}
                            Customer
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <label>
                            <Field
                              name="usertype"
                              component="input"
                              type="radio"
                              value="vendor"
                              className="form-check-input"
                              onChange={(e) =>
                                this.setState({ userType: e.target.value })
                              }
                            />{" "}
                            Vendor
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.renderForms(this.state.userType)}
                </form>
              </div>
            </div>
          </main>
        </Animation>
      </Navbar>
    );
  }
}

export default connect(null, { createUser })(
  reduxForm({
    form: "userCreate",
  })(UserCreate)
);
