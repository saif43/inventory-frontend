import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import {
  getStock,
  moveProduct,
  getProductStockInAllWarehouse,
} from "../../actions/productAction";
import Helmet from "react-helmet";
import { getAllWarehouse } from "../../actions/warehouseAction";
class ProductMove extends Component {
  state = {
    selectedProduct: null,
    selectedWarehouse: "",
    quantity: 0,
    move: null,
    productAlert: false,
    warehouseAlert: false,
    quantityAlert: false,
    optionAlert: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const warehouse = this.state.selectedWarehouse;
    const product = this.state.selectedProduct;
    const quantity = this.state.quantity;
    const move = this.state.move;

    let info = { warehouse: null, product: null, quantity: 0, move: null };

    if (warehouse && product && quantity > 0 && move) {
      info["warehouse"] = warehouse;
      info["product"] = product.id;
      info["quantity"] = quantity;
      info["move"] = move;

      this.setState({
        warehouseAlert: false,
        productAlert: false,
        quantityAlert: false,
        optionAlert: false,
      });

      this.props.moveProduct(info);
      return;
    }

    this.setState({ warehouseAlert: warehouse === "" });
    this.setState({ productAlert: product === null });
    this.setState({ quantityAlert: quantity === 0 });
    this.setState({ optionAlert: move === null });
  };

  componentDidMount() {
    this.props.getStock();
    this.props.getAllWarehouse();
  }

  renderAllWarehouse() {
    return this.props.warehouseList.map((data) => {
      return (
        <option key={data.id} value={data.id}>
          {data.name}
        </option>
      );
    });
  }

  onProductSelect(product_id) {
    this.setState({ selectedProduct: product_id });
    this.props.getProductStockInAllWarehouse(product_id);
  }

  renderAlert(item) {
    switch (item) {
      case "product":
        if (this.state.productAlert) {
          return (
            <small className="text-danger">You must select a product.</small>
          );
        }
        break;
      case "warehouse":
        if (this.state.warehouseAlert) {
          return (
            <small className="text-danger">You must select a warehouse.</small>
          );
        }
        break;
      case "quantity":
        if (this.state.quantityAlert) {
          return (
            <small className="text-danger">
              Quantity must be greater than 0.
            </small>
          );
        }
        break;
      case "option":
        if (this.state.optionAlert) {
          return (
            <small className="text-danger">You must select an option.</small>
          );
        }
        break;

      default:
        break;
    }
  }

  getShopStock() {
    if (this.state.selectedProduct) {
      let result = this.props.stock.filter(
        (instance) => instance.id === this.state.selectedProduct.id
      );

      return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Shop Stock
          <span className="badge bg-primary rounded-pill">
            {result[0].stock}
          </span>
        </li>
      );
    }
  }

  getWarehouseStock() {
    if (this.state.selectedProduct)
      return this.props.productInAllWarehouse.map((instance) => {
        return (
          <li
            key={instance.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {instance.warehouse.name}
            <span className="badge bg-primary rounded-pill">
              {instance.quantity}
            </span>
          </li>
        );
      });
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Move Product</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h3>Move product</h3>
              </div>
            </div>
          </div>
          <div className="row p-2 main-body">
            <div className="col-md-6 product-suggestions">
              <div className="mb-2">
                <label className="form-label">Product Name</label>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.stock}
                  onChange={(_, value) => {
                    this.onProductSelect(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        placeholder="Search by Product"
                        type="text"
                        {...params.inputProps}
                        className="form-control"
                      />
                    </div>
                  )}
                />
                {this.renderAlert("product")}
              </div>
              <div className="mb-2">
                <label className="form-label">Options</label>
                <div className="form-check">
                  <input
                    id="S2W"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    onChange={() => this.setState({ move: "S2W" })}
                  />
                  <label htmlFor="S2W" className="form-check-label">
                    Shop to Warehouse
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="W2S"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    onChange={() => this.setState({ move: "W2S" })}
                  />
                  <label htmlFor="W2S" className="form-check-label">
                    Warehouse to Shop
                  </label>
                </div>
                {this.renderAlert("option")}
              </div>

              <div className="mb-2">
                <label className="form-label">Select Warehouse</label>
                <select
                  className=" form-control form-select"
                  aria-label=".form-select-sm example"
                  onChange={(e) =>
                    this.setState({ selectedWarehouse: e.target.value })
                  }
                  value={this.state.selectedWarehouse}
                >
                  <option value="">Select</option>
                  {this.renderAllWarehouse()}
                </select>
                {this.renderAlert("warehouse")}
              </div>
              <div className="mb-2">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Name"
                  value={this.state.quantity}
                  onChange={(e) => this.setState({ quantity: e.target.value })}
                />
                {this.renderAlert("quantity")}
              </div>

              <div>
                <button
                  onClick={(e) => this.onSubmit(e)}
                  className="btn btn-success mb-4"
                >
                  Move
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <ul className="list-group">
                  <div className="mb-2 h6">Stock in store</div>

                  {this.getShopStock()}
                  <hr></hr>
                  <div className="mb-2 mt-2 h6">Stock in warehouses</div>
                  {this.getWarehouseStock()}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stock: Object.values(state.product.stock),
    productInAllWarehouse: Object.values(state.product.productInAllWarehouse),
    warehouseList: Object.values(state.warehouse.warehouseList),
  };
};

export default connect(mapStateToProps, {
  getStock,
  getAllWarehouse,
  moveProduct,
  getProductStockInAllWarehouse,
})(ProductMove);
