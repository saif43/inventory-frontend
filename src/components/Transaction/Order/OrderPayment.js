import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../../actions/userAction";
import { getAllWarehouse } from "../../../actions/warehouseAction";
import { createOrder } from "../../../actions/orderAction";
import Navbar from "../../../Reuseable-component/Navbar";

import { Autocomplete } from "@material-ui/lab";
//ref : https://stackoverflow.com/questions/46816869/module-not-found-cant-resolve-material-ui-autocomplete
//ref: https://material-ui.com/getting-started/installation/

import "./../Sales/Payment.css";

class OrderPayment extends Component {
  state = {
    cart: null,
    selectedVendor: null,
    vendors: null,
    searchedVendor: "",
    selectedWarehouse: null,
    warehouse: null,
    searchedWarehouse: "",
    paid: 0,
    selectvendor: 0,
    selectwarehouse: 0,
  };

  componentDidMount() {
    this.props.getUserList("vendor");
    this.props.getAllWarehouse();

    if (this.props.location.state.cart) {
      const cart = Object.values(this.props.location.state.cart);
      this.setState({
        cart: cart,
        subTotal: this.props.location.state.subTotal,
      });
    }
  }

  renderInvoice() {
    if (this.state.cart)
      return this.state.cart.map(({ id, name, buying_price, quantity }) => {
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{buying_price}</td>
            <td>{quantity}</td>
            <td>{buying_price * quantity}</td>
          </tr>
        );
      });
  }

  renderVendors() {
    if (this.props.vendors) {
      return (
        <Autocomplete
          id="combo-box-demo"
          options={this.props.vendors}
          onChange={(_, value) => {
            this.setState({ selectedVendor: value });
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                placeholder="Search by client name"
                type="text"
                {...params.inputProps}
                className="form-control"
              />
            </div>
          )}
        />
      );
    }
  }

  renderWarehouses() {
    if (this.props.warehouseList) {
      return (
        <Autocomplete
          id="combo-box-demo-1"
          options={this.props.warehouseList}
          onChange={(_, value) => {
            this.setState({ selectedWarehouse: value });
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                placeholder="Search by warehouse name"
                type="text"
                {...params.inputProps}
                className="form-control"
              />
            </div>
          )}
        />
      );
    }
  }

  onPayment = (amount) => {
    if (amount <= this.state.subTotal) {
      this.setState({ paid: amount });
    }
  };

  onFormSubmit = () => {
    const { selectedVendor, cart, paid, selectedWarehouse } = this.state;

    if (selectedVendor && paid && selectedWarehouse) {
      this.props.createOrder(selectedVendor.id, cart, paid, selectedWarehouse);
    }
  };

  render() {
    return (
      <Navbar>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Purchase Order details</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-sm-12 text-end">
                  <button
                    onClick={() => this.onFormSubmit()}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body ">
            <div className="col-md-12 p-4">
              <div className="row mb-2 mt-4">
                <div className="col-md-6">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label mt-2">Warehouse</label>
                    </div>
                    <div className="col-md-6">{this.renderWarehouses()}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label mt-2">Vendor</label>
                    </div>
                    <div className="col-md-6">{this.renderVendors()}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label ">Order date</label>
                    </div>
                    <div className="col-md-6">28/05/21</div>
                  </div>
                </div>
                <div className="col-md-6 p-2 text-end">
                  <h6>Billing address</h6>

                  <p>
                    {this.state.selectedVendor
                      ? this.state.selectedVendor.name
                      : ""}
                    <br />
                    {this.state.selectedVendor
                      ? this.state.selectedVendor.contact
                      : ""}
                  </p>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="table-white">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total(BDT)</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderInvoice()}</tbody>
                </table>
              </div>
              <div className="row mb-4 g-0">
                <div className="col-md-6 p-2"></div>
                <div className="col-md-6 p-2">
                  <div className="row mb-4 g-0 text-end">
                    <div className="col-6 p-2">
                      <h6> Sub Total</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.state.subTotal}
                    </div>
                    <div className="col-6 p-2 mt-2">
                      <h6 className="muted">Paid</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      <input
                        onChange={(e) => this.onPayment(e.target.value)}
                        value={this.state.paid}
                        type="number"
                        className="form-control input-center"
                        min="0"
                      />
                    </div>
                    <div className="col-6 p-2">
                      <h6 className="muted">Due</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.state.subTotal
                        ? this.state.subTotal - this.state.paid
                        : ""}
                    </div>
                    <div className="col-6 p-2"></div>
                    <div className="col-6 p-2 text-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  let INITIAL_STATE = {
    vendors: null,
    warehouseList: null,
  };

  if (state.user.userlist) {
    INITIAL_STATE.vendors = Object.values(state.user.userlist);
  }
  if (state.warehouse.warehouseList) {
    INITIAL_STATE.warehouseList = Object.values(state.warehouse.warehouseList);
  }

  return INITIAL_STATE;
};

export default connect(mapStateToProps, {
  getUserList,
  createOrder,
  getAllWarehouse,
})(OrderPayment);
