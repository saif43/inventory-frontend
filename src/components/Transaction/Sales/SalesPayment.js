import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../../actions/userAction";
import { createSale } from "../../../actions/salesAction";
import Navbar from "../../../Reuseable-component/Navbar";

import { Autocomplete } from "@material-ui/lab";
//ref : https://stackoverflow.com/questions/46816869/module-not-found-cant-resolve-material-ui-autocomplete
//ref: https://material-ui.com/getting-started/installation/

import "./Payment.css";

class SalesPayment extends Component {
  state = {
    cart: null,
    selectedCustomer: null,
    customers: null,
    paid: 0,
    searchedCustomer: "",
  };

  componentDidMount() {
    this.props.getUserList("customer");

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
      return this.state.cart.map(({ id, name, selling_price, quantity }) => {
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{selling_price}</td>
            <td>{quantity}</td>
            <td>{selling_price * quantity}</td>
          </tr>
        );
      });
  }

  renderCustomers() {
    if (this.props.customers) {
      return (
        <Autocomplete
          id="combo-box-demo"
          options={this.props.customers}
          onChange={(_, value) => {
            this.setState({ selectedCustomer: value });
          }}
          getOptionLabel={(option) => option.name + ", " + option.contact}
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

  onPayment = (amount) => {
    if (amount <= this.state.subTotal) {
      this.setState({ paid: amount });
    }
  };

  onFormSubmit = () => {
    const { selectedCustomer, cart, paid } = this.state;

    if (selectedCustomer && paid) {
      this.props.createSale(selectedCustomer.id, cart, paid);
    }
  };

  render() {
    return (
      <Navbar>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Sales Order details</h4>
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
                      <label className="form-label mt-2">Customer</label>
                    </div>
                    <div className="col-md-6">{this.renderCustomers()}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label ">Order #</label>
                    </div>
                    <div className="col-md-6">1844</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label ">Order date</label>
                    </div>
                    <div className="col-md-6">28/05/21</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label ">
                        Expected shipping date
                      </label>
                    </div>
                    <div className="col-md-6">01/06/21</div>
                  </div>
                </div>
                <div className="col-md-6 p-2 text-end">
                  <h6>Billing address</h6>
                  <p>
                    {this.state.selectedCustomer
                      ? this.state.selectedCustomer.name
                      : ""}
                    <br />
                    {this.state.selectedCustomer
                      ? this.state.selectedCustomer.contact
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
                    <div className="col-6 p-2">
                      <h6 className="muted mt-2">Paid</h6>
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
  if (state.user.userlist) {
    return {
      customers: Object.values(state.user.userlist),
    };
  } else return { customers: null };
};

export default connect(mapStateToProps, { getUserList, createSale })(
  SalesPayment
);
