import React, { Component } from "react";
import Navbar from "./../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import {
  deleteProduct,
  getProduct,
  getProductStockInAllWarehouse,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

class ProductDetail extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.props.getProductStockInAllWarehouse(this.props.match.params.id);
  }

  onDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirm) {
      this.props.deleteProduct(id);
    }
  }

  getColumns = () => {
    return [
      {
        name: "Warehouse name",
        selector: "warehouse.name",
        sortable: true,
        center: true,
      },
      {
        name: "Qunatity",
        selector: "quantity",
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
              to={`/warehouse/detail/${row.warehouse.id}`}
              className="btn btn-sm btn-primary"
            >
              View Warehouse
            </Link>
          </div>
        ),
      },
    ];
  };

  renderWarehouse() {
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

    return (
      <DataTable
        title="Product in Warehouse"
        noHeader
        responsive
        columns={this.getColumns()}
        data={this.props.productInAllWarehouse}
        // highlightOnHover
        pagination
        customStyles={customStyles}
        paginationRowsPerPageOptions={[5, 10, 15, 100]}
      />
    );
  }

  renderProductDetail() {
    if (this.props.detail) {
      const {
        id,
        name,
        stock,
        buying_price,
        selling_price,
        image,
        stock_alert_amount,
      } = this.props.detail;

      return (
        <div className="row p-4">
          <div className="col-md-5 col-sm-12 text-center">
            <img
              src={
                image ||
                "https://cutewallpaper.org/21/rog-strix-wallpaper/Best-43-NVIDIA-Asus-ROG-Wallpaper-on-HipWallpaper-Asus-.png"
              }
              className=""
              alt="..."
              width="100%"
              style={{ maxWidth: "450px", maxHeight: "450px" }}
              height="auto"
            />
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="row edit-product">
              <div className="col-md-12 col-sm-12">
                <label className="form-label ">Product Name</label>
                <input
                  className="form-control mb-3 niche_border"
                  value={name}
                  disabled
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label className="form-label">Shop stock</label>
                <input
                  type="number"
                  className="form-control mb-3 niche_border"
                  value={stock}
                  disabled
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label className="form-label">Buying Price</label>
                <input
                  className="form-control mb-3 niche_border"
                  type="number"
                  value={buying_price}
                  disabled
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label className="form-label">Selling Price</label>
                <input
                  className="form-control mb-3 niche_border"
                  type="number"
                  value={selling_price}
                  disabled
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label">Stock Alert Amount</label>
                <input
                  name="selling_price"
                  className="form-control mb-3 niche_border"
                  value={stock_alert_amount}
                  disabled
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label">Brand</label>
                <input
                  name="selling_price"
                  className="form-control mb-3 niche_border"
                  disabled
                />
              </div>
              <div>
                <Link to="/product/all" className="btn btn-primary mt-3">
                  Close
                </Link>
                <Link
                  to={`/product/update/${id}`}
                  className="btn btn-secondary mt-3"
                  style={{ marginLeft: "2%" }}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-secondary mt-3"
                  style={{ marginLeft: "2%" }}
                  onClick={() => this.onDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Navbar>
        <main className="col-md-9 ms-sm-auto col-lg-10">
          <div className="row mb-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
              <h3>Product details</h3>
            </div>
          </div>
          <div className="row main-body ">
            {this.renderProductDetail()}
            {this.renderWarehouse()}
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.product.detail,
    productInAllWarehouse: Object.values(state.product.productInAllWarehouse),
  };
};

export default connect(mapStateToProps, {
  getProduct,
  deleteProduct,
  getProductStockInAllWarehouse,
})(ProductDetail);
