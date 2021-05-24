import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { getUserList } from "./../../actions/userAction";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Animation from "../../Reuseable-component/Animation";
const customStyles = {
  rows: {
    style: {
      // override the row height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  headCells: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};
class UserList extends Component {
  state = { userType: "", mountTouched: false, query: "" };

  componentDidMount() {
    this.setState({
      userType: this.props.match.params.usertype,
      mountTouched: true,
    });
  }

  componentDidUpdate() {
    // We have used this condition to stop sending unnecessary request to server

    if (this.state.userType !== this.props.match.params.usertype) {
      // If previously rendered User and just clicked User are not same
      // In short, this portion will run on componentDidUpdate

      this.setState({ userType: this.props.match.params.usertype });
      this.props.getUserList(this.props.match.params.usertype);
    } else if (this.state.mountTouched) {
      // This portion will run if componentDidMount

      this.setState({ mountTouched: false });
      this.props.getUserList(this.props.match.params.usertype);
    }
  }

  getColumns = () => {
    let usertype = this.props.match.params.usertype;
    if (usertype === "customer" || usertype === "vendor") {
      return [
        {
          name: "User ID",
          selector: "id",
          sortable: true,
          center: true,
        },
        {
          name: "Name",
          selector: "name",
          sortable: true,
          center: true,
        },

        {
          name: "Contact",
          selector: "contact",
          sortable: true,
          center: true,
        },
        {
          name: "View",
          sortable: false,
          center: true,
          cell: (row) => (
            <div data-tag="allowRowEvents">
              <Link
                to={`/user/detail/${usertype}/${row.id}`}
                className="btn btn-sm btn-primary"
              >
                View
              </Link>
            </div>
          ),
        },
      ];
    } else if (usertype === "manager" || usertype === "salesman") {
      return [
        {
          name: "User ID",
          selector: "id",
          sortable: true,
          center: true,
        },
        {
          name: "Name",
          selector: "username",
          sortable: true,
          center: true,
        },

        {
          name: "Contact",
          selector: "contact",
          sortable: true,
          center: true,
        },
        {
          name: "View",
          sortable: false,
          center: true,
          cell: (row) => (
            <div data-tag="allowRowEvents">
              <Link
                to={`/user/detail/${usertype}/${row.id}`}
                className="btn btn-sm btn-primary"
              >
                View
              </Link>
            </div>
          ),
        },
      ];
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTitle(usertype) {
    switch (usertype) {
      case "customer":
        return "Customer list";
      case "vendor":
        return "Vendor list";
      case "manager":
        return "Manager list";
      case "salesman":
        return "Salesman list";

      default:
        return "";
    }
  }

  renderUserList() {
    const query = this.state.query.toLowerCase();
    let { userlist } = this.props;

    if (query) {
      userlist = userlist.filter(
        (user) =>
          String(user.id).toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query) ||
          user.contact.toLowerCase().includes(query)
      );
    }

    return (
      <DataTable
        noHeader
        responsive
        columns={this.getColumns()}
        data={userlist}
        // highlightOnHover
        pagination
        customStyles={customStyles}
        paginationRowsPerPageOptions={[5, 10, 15, 100]}
      />
    );
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>{this.renderTitle(this.props.match.params.usertype)}</title>
        </Helmet>
        <Animation>
          <main className="col-md-9 ms-sm-auto col-lg-10 ">
            <div className="row mb-3">
              <div className="col-md-12 col-sm-12">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                  <h4>{this.renderTitle(this.props.match.params.usertype)}</h4>
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-md-7 col-sm-12 text-end"></div>
                  <div className="col-md-5 col-sm-12 text-end">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search by user ID or name"
                      onChange={(e) => this.setState({ query: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0 main-body main-body-with-table">
              {this.renderUserList()}
            </div>
          </main>
        </Animation>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userlist: state.user.userlist,
  };
};

export default connect(mapStateToProps, { getUserList })(UserList);
