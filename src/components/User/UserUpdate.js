import React, { Component } from "react";
import { connect } from "react-redux";
import { getSpecificUser, updateUser } from "../../actions/userAction";
import Helmet from "react-helmet";
import Navbar from "../../Reuseable-component/Navbar";

class UserUpdate extends Component {
  state = { id: "", username: "", name: "", contact: "", email: "" };

  componentDidMount() {
    const { usertype, id } = this.props.match.params;

    this.props.getSpecificUser(id, usertype);

    const { username, name, contact, email } = this.props.user;

    if (usertype === "customer" || usertype === "vendor") {
      this.setState({ username, name, contact });
    } else {
      this.setState({ username, name, contact, email });
    }
  }

  componentDidUpdate() {
    const { usertype } = this.props.match.params;

    if (this.state.id !== this.props.user.id) {
      const { id, username, name, contact, email } = this.props.user;
      this.setState({
        id,
        username,
        name,
        contact,
        email,
      });

      if (usertype === "customer" || usertype === "vendor") {
        this.setState({ username, name, contact });
      } else {
        this.setState({ username, name, contact, email });
      }
    }
  }

  onSubmit = () => {
    const { username, name, contact, email } = this.state;
    const formdata = { ...this.props.user, username, name, contact, email };
    this.props.updateUser(
      this.props.user.id,
      formdata,
      this.props.match.params.usertype
    );
  };

  renderUserInfo() {
    if (this.state.id) {
      if (["customer", "vendor"].includes(this.props.match.params.usertype)) {
        return (
          <div className="row">
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
    user: state.user.specificUser,
  };
};

export default connect(mapStateToProps, { getSpecificUser, updateUser })(
  UserUpdate
);
