import React, { Component } from "react";
import { connect } from "react-redux";
import NewPassword from "./NewPassword";
import md5 from "md5";
import { getOTP } from "../../../actions/authAction";

class EnterOTP extends Component {
  state = { otp: "", errorflag: 0, otp_matched: false, otp_send_msg: "" };

  verifyOTP = (e) => {
    e.preventDefault();
    if (this.props.recover_otp !== md5(this.state.otp)) {
      this.setState({ errorflag: 1 });
    } else {
      this.setState({ otp_matched: true });
    }
  };

  renderOTPError() {
    if (this.state.errorflag)
      return (
        <p className="mt-4 text-danger">
          Couldn't match the OTP. Please resend to get a new OTP.
        </p>
      );
  }

  resendOTP(e) {
    e.preventDefault();
    const otp_send_msg = "Please check your email for new OTP.";
    this.setState({ otp_send_msg });
  }

  renderResendOTPNotice() {
    if (this.state.otp_send_msg) {
      return (
        <div className="alert alert-info mt-3" role="alert">
          {this.state.otp_send_msg}
        </div>
      );
    }
  }

  render() {
    if (this.state.otp_matched) {
      return <NewPassword />;
    }

    return (
      <form onSubmit={(e) => this.verifyOTP(e)}>
        <blockquote className="blockquote">
          <p>A 6-digit OTP has been sent to your email.</p>
        </blockquote>
        <input
          type="number"
          value={this.state.otp}
          onChange={(e) => this.setState({ otp: e.target.value })}
          className="form-control"
          placeholder="Enter 6-digit OTP"
        />
        {this.renderOTPError()}
        <button
          className="mt-4 btn btn-md btn-primary"
          style={{ marginRight: "2%" }}
        >
          Submit
        </button>
        <button
          onClick={(e) => this.resendOTP(e)}
          className="mt-4 btn btn-md btn-secondary"
        >
          Resend
        </button>
        {this.renderResendOTPNotice()}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recover_user: state.auth.recover_user,
    recover_otp: state.auth.recover_otp,
  };
};

export default connect(mapStateToProps, { getOTP })(EnterOTP);
