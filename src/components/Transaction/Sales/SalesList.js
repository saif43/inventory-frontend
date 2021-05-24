import React, { Component } from "react";
import Navbar from "../../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { getAllSales } from "../../../actions/salesAction";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Helmet from "react-helmet";
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
class SalesList extends Component {
  state = { query: "" };

  componentDidMount() {
    this.props.getAllSales();
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
        name: "Customer Name",
        selector: "customer.name",
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
        name: "Time",
        sortable: true,
        center: true,
        hide: "600px",
        cell: (row) =>
          dateformat(row.created_timestamp, "ddd, mmm d, yyyy, h:MM TT"),
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
          } else {
            status = <span class="badge bg-success text-white">Complete</span>;
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
              to={`/sales/detail/${row.id}`}
              className="btn btn-sm btn-primary"
            >
              View
            </Link>
          </div>
        ),
      },
    ];
  };

  renderSalesList() {
    const query = this.state.query.toLowerCase();
    let { sales } = this.props;

    if (query) {
      sales = sales.filter(
        (sale) =>
          String(sale.id).toLowerCase().includes(query) ||
          sale.customer.name.toLowerCase().includes(query)
      );
    }

    return (
      <DataTable
        noHeader
        responsive
        columns={this.getColumns()}
        data={sales}
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
          <title>Sales list</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Sales List</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-7 col-sm-12 text-end"></div>
                <div className="col-md-5 col-sm-12 text-end">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search by trans. ID or Customer name"
                    onChange={(e) => this.setState({ query: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body main-body-with-table">
            {this.renderSalesList()}
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sales: Object.values(state.sales.saleslist),
  };
};

export default connect(mapStateToProps, { getAllSales })(SalesList);
