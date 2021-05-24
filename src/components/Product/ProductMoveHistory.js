import React, { Component } from "react";
import { getMoveProductHistory } from "../../actions/productAction";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
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

class ProductMoveHistory extends Component {
  state = { query: "" };

  componentDidMount() {
    this.props.getMoveProductHistory();
  }

  getColumns = () => {
    return [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
      },
      {
        name: "Product Name",
        selector: "product.name",
        sortable: true,
        center: true,
      },
      {
        name: "Stock",
        selector: "quantity",
        sortable: true,
        center: true,
      },
      {
        name: "From",
        selector: "from",
        sortable: true,
        center: true,
      },
      {
        name: "To",
        selector: "to",
        sortable: true,
        center: true,
      },
    ];
  };

  renderHistory() {
    const query = this.state.query.toLowerCase();
    let { history } = this.props;

    if (query) {
      history = history.filter(
        (row) =>
          String(row.id).toLowerCase().includes(query) ||
          row.product.name.toLowerCase().includes(query)
      );
    }

    return (
      <DataTable
        noHeader
        responsive
        columns={this.getColumns()}
        data={history}
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
          <title>Product Move history</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Stock List</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-6 col-sm-12 text-end"></div>
                <div className="col-md-5 col-sm-12 text-end">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search by history ID or Product name"
                    onChange={(e) => this.setState({ query: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body ">{this.renderHistory()}</div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    history: Object.values(state.product.movehistory),
  };
};

export default connect(mapStateToProps, { getMoveProductHistory })(
  ProductMoveHistory
);
