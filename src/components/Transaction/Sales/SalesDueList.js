import React, { Component } from "react";
import { getDueList } from "../../../actions/salesAction";
import Navbar from "../../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import DataTable from "react-data-table-component";
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
class SalesDueList extends Component {
  state = { query: "" };

  componentDidMount() {
    this.props.getDueList();
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
        name: "Due",
        selector: "due",
        sortable: true,
        center: true,
      },
      {
        name: "Paid",
        selector: "paid",
        sortable: true,
        center: true,
        hide: "600px",
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
      {
        name: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-gear"
            viewBox="0 0 16 16"
            style={{ marginLeft: "-95%" }}
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        ),
        sortable: false,
        right: true,
        width: "10px",
        cell: (row) => (
          <div data-tag="allowRowEvents">
            <>
              <span
                className="nav-link "
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <span className="dropdown-item">Edit</span>
                </li>
                <li>
                  <span className="dropdown-item">Delete</span>
                </li>
              </ul>
            </>
          </div>
        ),
      },
    ];
  };

  renderSalesDueList() {
    const query = this.state.query.toLowerCase();
    let { salesDueList } = this.props;

    if (query) {
      salesDueList = salesDueList.filter(
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
        data={salesDueList}
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
          <title>Sales due list</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Sales Due List</h4>
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
          <div className="row g-0 main-body ">{this.renderSalesDueList()}</div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { salesDueList: Object.values(state.sales.salesDueList) };
};

export default connect(mapStateToProps, { getDueList })(SalesDueList);
