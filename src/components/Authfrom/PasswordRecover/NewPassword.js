import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changePassword } from "../../../actions/userAction";
class NewPassword extends Component {
  state = { password: "", reenter_password: "", submitted: false };

  onSubmit = () => {
    this.setState({ submitted: true });

    if (this.state.password === this.state.reenter_password) {
      let user = this.props.recover_user;
      user.password = this.state.password;
      this.props.changePassword(user.id, user);
    }
  };

  renderError() {
    const { password, reenter_password, submitted } = this.state;
    if (password !== reenter_password && submitted)
      return <p className="mt-4 text-danger">Password didn't match</p>;

    if (password === reenter_password && password.length)
      return <p className="mt-4 text-success">Password matched</p>;
  }

  render() {
    if (this.props.password_changed === true) {
      return (
        <>
          <div className="alert alert-success" role="alert">
            Password has been changed successfully
          </div>
          <p>
            Goto <Link to="/login">Login page</Link>
          </p>
        </>
      );
    }

    return (
      <>
        <blockquote className="blockquote">
          <p>Enter new password</p>
        </blockquote>
        <input
          type="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
          className="form-control mb-3"
          placeholder="Enter password"
        />
        <input
          type="password"
          value={this.state.reenter_password}
          onChange={(e) => this.setState({ reenter_password: e.target.value })}
          className="form-control"
          placeholder="Confirm password"
        />
        {this.renderError()}
        <button
          onClick={() => this.onSubmit()}
          className="mt-4 btn btn-md btn-primary"
        >
          Submit
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    password_changed: state.auth.password_changed,
    recover_user: state.auth.recover_user,
  };
};

export default connect(mapStateToProps, { changePassword })(NewPassword);
