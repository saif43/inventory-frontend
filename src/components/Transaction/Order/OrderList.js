import React, { Component } from "react";
import Navbar from "../../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { getAllOrders } from "../../../actions/orderAction";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import DataTable from "react-data-table-component";
import dateformat from "dateformat";
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
class OrderList extends Component {
  state = { query: "" };

  componentDidMount() {
    this.props.getAllOrders();
  }

  getColumns = () => {
    return [
      {
        name: "Transaction ID",
        selector: "id",
        sortable: true,
        center: true,
      },
      {
        name: "Vendor Name",
        selector: "vendor.name",
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
        name: "Paid",
        selector: "paid",
        sortable: true,
        center: true,
      },
      {
        name: "Date",
        sortable: true,
        center: true,
        hide: "600px",
        cell: (row) => dateformat(row.created_timestamp, "ddd, mmm d, yyyy"),
      },

      {
        name: "Status",
        selector: "status",
        sortable: true,
        center: true,
        cell: (row) => {
          let status = "";
          if (row.due > 0) {
            status = (
              <span class="badge bg-danger text-white">
                Payment due - {row.due}
              </span>
            );
          } else if (!row.product_received) {
            status = (
              <span class="badge bg-warning text-dark">
                Product not Received
              </span>
            );
          } else {
            status = (
              <span class="badge bg-success text-white">Product received </span>
            );
          }
          return status;
        },
      },
      {
        name: "View",
        sortable: false,
        center: true,
        cell: (row) => (
          <div data-tag="allowRowEvents">
            <Link
              to={`/order/detail/${row.id}`}
              className="btn btn-sm btn-primary"
            >
              View
            </Link>
          </div>
        ),
      },
    ];
  };

  renderOrderList() {
    const query = this.state.query.toLowerCase();
    let { order } = this.props;

    if (query) {
      order = order.filter(
        (order) =>
          String(order.id).toLowerCase().includes(query) ||
          order.vendor.name.toLowerCase().includes(query)
      );
    }

    return (
      <DataTable
        noHeader
        responsive
        columns={this.getColumns()}
        data={order}
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
          <title>Order list</title>
        </Helmet>

        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Purchase List</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-7 col-sm-12 text-end"></div>
                <div className="col-md-5 col-sm-12 text-end">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search by trans. ID or Vendor name"
                    onChange={(e) => this.setState({ query: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body main-body-with-table">
            {this.renderOrderList()}
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: Object.values(state.order.orderlist),
  };
};

export default connect(mapStateToProps, { getAllOrders })(OrderList);
