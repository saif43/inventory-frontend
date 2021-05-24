import React, { Component } from "react";
import { connect } from "react-redux";
import { searchByUsername } from "../../../actions/authAction";
import EnterOTP from "./EnterOTP";

class SearchUser extends Component {
  state = { username: "" };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchByUsername(this.state.username);
  };

  renderError() {
    if (!this.props.recover_user)
      return <p className="mt-4 text-danger">No account found</p>;
  }

  render() {
    if (Object.keys(this.props.recover_user).length) {
      return <EnterOTP />;
    }
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <h1 className="h3 mb-3 fw-normal">Search by Username</h1>
        <input
          className="form-control mt-4"
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <button className="mt-4 w-50 btn btn-sm btn-primary">Search</button>
        {this.renderError()}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recover_user: state.auth.recover_user,
  };
};

export default connect(mapStateToProps, { searchByUsername })(SearchUser);
