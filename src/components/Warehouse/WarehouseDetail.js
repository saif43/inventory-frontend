import React, { Component } from "react";
import {
  getWarehouseProducts,
  getWarehouse,
} from "../../actions/warehouseAction";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";

class WarehouseDetail extends Component {
  componentDidMount() {
    this.props.getWarehouseProducts(this.props.match.params.id);
    this.props.getWarehouse(this.props.match.params.id);
  }

  renderProducts() {
    if (this.props.warehouseProducts) {
      return this.props.warehouseProducts.map((list) => {
        return (
          <tr key={list.id}>
            <td>{list.product.id}</td>
            <td>{list.product.name}</td>
            <td>{list.quantity}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <Navbar>
        <main className="col-md-9 ms-sm-auto col-lg-10">
          <div className="row mb-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
              <p>
                <Link to="/warehouse/all">Warehouse</Link> /{" "}
                {this.props.warehouse.name}
              </p>
            </div>
            <div className="col text-end">
              <button
                onClick={() => history.push("/warehouse/all")}
                className="btn btn-primary"
              >
                Show all warehouses
              </button>
            </div>
          </div>
          <div className="row main-body">
            <div className="col-md-12 col-sm-12 p-2 gol-border">
              <table className="table table-sm text-center">
                <thead>
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Stock</th>
                  </tr>
                </thead>
                <tbody>{this.renderProducts()}</tbody>
              </table>
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    warehouseProducts: Object.values(state.warehouse.warehouseProducts),
    warehouse: state.warehouse.warehouse,
  };
};

export default connect(mapStateToProps, { getWarehouseProducts, getWarehouse })(
  WarehouseDetail
);
