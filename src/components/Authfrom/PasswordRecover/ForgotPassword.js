import React, { Component } from "react";
import Helmet from "react-helmet";
import { resetRecoveryInfo } from "../../../actions/authAction";
import SearchUser from "./SearchUser";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  componentDidMount() {
    this.props.resetRecoveryInfo();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Recover password</title>
        </Helmet>
        <main className="form-signin text-center">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width={72}
            height={57}
          />
          <SearchUser />
        </main>
      </div>
    );
  }
}

export default connect(null, { resetRecoveryInfo })(ForgotPassword);
