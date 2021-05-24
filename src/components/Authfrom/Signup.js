import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { signup } from "../../actions/authAction";

class Signup extends Component {
  onSubmit = (formValues) => {
    this.props.signup(formValues);
  };

  render() {
    return (
      <main className="form-signin text-center">
        <Helmet>
          <title>Sign up</title>
        </Helmet>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>
          <label className="visually-hidden">Shop Name</label>
          <Field
            name="name"
            className="form-control mb-2"
            placeholder="Full name"
            component="input"
          />
          <Field
            name="username"
            className="form-control mb-2"
            placeholder="Username"
            component="input"
          />
          <Field
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            component="input"
          />
          <Field
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            component="input"
          />
          <button className="w-100 btn btn-lg btn-primary mt-3">Sign up</button>
          <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
        </form>
        <p className="mt-5 mb-2">Already have an account?</p>
        <Link to="login" className="w-100 btn btn-sm btn-secondary">
          Log in
        </Link>
      </main>
    );
  }
}

export default connect(null, { signup })(
  reduxForm({
    form: "signup",
  })(Signup)
);
