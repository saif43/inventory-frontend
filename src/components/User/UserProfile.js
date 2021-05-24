import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { getLoggedInUser, updateUser } from "./../../actions/userAction";

class UserProfile extends Component {
  state = { username: "", name: "", contact: "" };

  componentDidMount() {
    this.props.getLoggedInUser();
    const { username, name, contact } = this.props.user;
    this.setState({
      username,
      name,
      contact,
    });
  }

  componentDidUpdate() {
    if (this.state.username !== this.props.user.username) {
      const { username, name, contact } = this.props.user;
      this.setState({
        username,
        name,
        contact,
      });
    }
  }

  onSubmit = () => {
    const { username, name, contact } = this.state;
    const formdata = { ...this.props.user, username, name, contact };
    this.props.updateUser(
      this.props.user.id,
      formdata,
      this.props.user.usertype
    );
  };

  renderUserInfo() {
    if (this.state.username)
      return (
        <div className="row">
          <div className="mb-2 col-md-12">
            <label className="form-label">User name</label>

            <input
              type="text"
              className="form-control niche_border"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className="mb-2 col-md-12">
            <label className="form-label">Full Name</label>

            <input
              component="input"
              type="text"
              className="form-control niche_border"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>

          <div className="mb-2 col-md-12">
            <label className="form-label">Contact</label>
            <input
              type="number"
              className="form-control niche_border"
              value={this.state.contact}
              onChange={(e) => this.setState({ contact: e.target.value })}
            />
          </div>

          <div>
            <button
              onClick={() => this.onSubmit()}
              className="btn btn-primary mt-3"
            >
              Update
            </button>
          </div>
        </div>
      );
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h3 style={{ color: "#F7F7F7" }}>.</h3>
              </div>
            </div>
          </div>

          <div className="row p-4 main-body">
            <div className="col-md-3 col-sm-12">
              <img
                src="https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"
                className="img-fluid shadow-sm w-75 mb-4"
                alt="Profile"
                style={{
                  border: "3px solid lightgray",
                  borderRadius: "10px",
                  marginTop: "-50px",
                  backgroundColor: "#F7F7F7",
                }}
              ></img>
              <h5>{this.props.user.name}</h5>
              <p>{this.props.user.type}</p>
            </div>
            <div className="col-md-9 col-sm-12">{this.renderUserInfo()}</div>
          </div>
        </main>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    shop: state.shop.shopDetail,
    user: state.user.specificUser,
  };
};
export default connect(mapStateToProps, { getLoggedInUser, updateUser })(
  UserProfile
);
