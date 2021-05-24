import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { getSpecificUser } from "./../../actions/userAction";
import history from "../../history";
import { getSpecificCustomerTransactions } from "../../actions/salesAction";
import { getSpecificVendorTransactions } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import UserDelete from "./UserDelete";

class UserDetail extends Component {
  componentDidMount() {
    this.props.getSpecificUser(
      this.props.match.params.id,
      this.props.match.params.usertype
    );

    if (this.props.match.params.usertype === "customer") {
      this.props.getSpecificCustomerTransactions(this.props.match.params.id);
    } else if (this.props.match.params.usertype === "vendor") {
      this.props.getSpecificVendorTransactions(this.props.match.params.id);
    }
  }

  getColumns = () => {
    let page = "";
    if (this.props.match.params.usertype === "customer") {
      page = "sales";
    } else if (this.props.match.params.usertype === "vendor") {
      page = "order";
    }

    return [
      {
        name: "Transaction ID",
        selector: "id",
        sortable: true,
        center: true,
      },
      {
        name: "Bill",
        selector: "bill",
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
              to={`/${page}/detail/${row.id}`}
              className="btn btn-sm btn-primary"
            >
              View
            </Link>
          </div>
        ),
      },
    ];
  };

  renderTransactions() {
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

    let data = [];

    if (this.props.match.params.usertype === "customer") {
      data = this.props.customerTransactions;
    } else if (this.props.match.params.usertype === "vendor") {
      data = this.props.vendorTransactions;
    }

    return (
      <DataTable
        noHeader
        responsive
        columns={this.getColumns()}
        data={data}
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
          <title>Details</title>
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
            <div className="col-md-3 col-sm-4">
              <img
                src="https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"
                className="img-fluid shadow-sm w-75 mb-4"
                alt="profile"
                style={{
                  border: "3px solid lightgray",
                  borderRadius: "10px",
                  marginTop: "-50px",
                  backgroundColor: "#F7F7F7",
                }}
              />
              <h5>{this.props.user.name}</h5>
              <p>{this.props.user.email}</p>
              <p>{this.props.user.contact}</p>
              <button
                onClick={() =>
                  history.push(
                    `/user/update/${this.props.match.params.usertype}/${this.props.match.params.id}`
                  )
                }
                style={{
                  marginRight: "5px",
                }}
                className="btn glass btn-primary"
              >
                Edit
              </button>

              <UserDelete
                usertype={this.props.match.params.usertype}
                id={this.props.match.params.id}
              />
            </div>
            <div className="col-md-9 col-sm-8 ">
              {this.renderTransactions()}
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.specificUser,
    customerTransactions: Object.values(state.sales.saleslist),
    vendorTransactions: Object.values(state.order.orderlist),
  };
};
export default connect(mapStateToProps, {
  getSpecificUser,
  getSpecificCustomerTransactions,
  getSpecificVendorTransactions,
})(UserDetail);
