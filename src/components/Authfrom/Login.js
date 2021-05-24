import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import "./AuthParent.css";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { signIn, turnOffLoader } from "../../actions/authAction";
import Spinner from "../../Reuseable-component/Spinner";

class Login extends Component {
  state = { passwordHidden: true, errorMsg: "" };

  renderInput = (formProps) => {
    return (
      <input
        className="form-control"
        type={formProps.type}
        placeholder={formProps.placeholder}
        {...formProps.input}
        autoComplete="off"
      />
    );
  };

  onSubmit = (formValues) => {
    this.props.signIn(formValues);
  };

  renderLoginButton() {
    if (this.props.loading) return <Spinner />;
    return (
      <button className="mt-4 w-100 btn btn-lg btn-primary">Log in</button>
    );
  }

  render() {
    return (
      <main className="form-signin text-center">
        <Helmet>
          <title>Log in</title>
        </Helmet>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <Field
            name="username"
            component={this.renderInput}
            type="text"
            placeholder="Username"
          />
          <div className="input-group mb-3 mt-3">
            <Field
              name="password"
              component={this.renderInput}
              type={this.state.passwordHidden ? "password" : "text"}
              placeholder="Password"
            />
            <span
              onClick={() =>
                this.setState({ passwordHidden: !this.state.passwordHidden })
              }
              className="btn btn-outline-secondary pt-2"
            >
              {this.state.passwordHidden ? "Show" : "Hide"}
            </span>
          </div>
          <Link style={{ textDecoration: "none" }} to="/user/password/recover">
            <small>Forgot password?</small>
          </Link>
          <p className="mt-1 mb-2 text-danger">
            {this.props.errorMsg ? this.props.errorMsg : ""}
          </p>
          {this.renderLoginButton()}
          <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
        </form>
        <p className="mt-5 mb-2">Not created any account?</p>
        <Link to="/signup" className="w-100 btn btn-sm btn-secondary">
          Sign up
        </Link>
        <button
          className="btn btn-outline-secondary"
          onClick={() => this.props.turnOffLoader()}
        >
          Cancel
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.auth) {
    return {
      loading: state.auth.loading,
      errorMsg: state.auth.errorMsg,
    };
  }

  return { loading: null, errorMsg: "" };
};

export default connect(mapStateToProps, { signIn, turnOffLoader })(
  reduxForm({
    form: "login",
  })(Login)
);
