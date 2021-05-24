import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSingleOrder,
  payDue,
  receiveOrder,
} from "../../../actions/orderAction";
import Navbar from "../../../Reuseable-component/Navbar";
import markLogo from "./mark.png";
import loading from "./loading.gif";
import Modal from "./../../../Reuseable-component/Modal";
import dateformat from "dateformat";
import Helmet from "react-helmet";

class OrderDetail extends Component {
  state = {
    paid: 0,
    modalStatus: false,
  };

  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.id);
  }

  renderInformation(query) {
    if (this.props.transaction.bill)
      switch (query) {
        case "date":
          return dateformat(
            this.props.transaction.bill.created_timestamp,
            "dddd, mmmm dS, yyyy, h:MM:ss TT"
          );

        case "order_id":
          return this.props.transaction.bill.order;

        case "vendor_name":
          return this.props.transaction.bill.vendor.name;

        case "vendor_contact":
          return this.props.transaction.bill.vendor.contact;

        case "subTotal":
          return this.props.transaction.bill.bill;

        case "due":
          return this.props.transaction.bill.due;

        case "paid":
          return this.props.transaction.bill.paid;
        default:
          return null;
      }
  }

  renderInvoice() {
    if (this.props.transaction)
      return this.props.transaction.cart.map((detail) => {
        return (
          <tr key={detail.id}>
            <td>{detail.product.name}</td>
            <td>{detail.custom_buying_price}</td>
            <td>{detail.quantity}</td>
            <td>{detail.delivery_warehouse.name}</td>
            <td>{detail.bill}</td>
          </tr>
        );
      });
  }

  onPayment = (amount) => {
    if (amount <= this.renderInformation("due")) {
      this.setState({ paid: amount });
    }
  };

  onFormSubmit = () => {
    this.props.payDue(this.props.transaction.bill.id, this.state.paid);
  };

  onCloseModal = () => {
    this.setState({ modalStatus: false });
  };

  onConfirmModal = () => {
    this.props.receiveOrder(this.props.match.params.id);
    this.setState({ receivedProduct: true });
  };

  renderPayment() {
    if (this.renderInformation("due")) {
      return (
        <>
          {this.renderReceivebutton()}{" "}
          <button
            onClick={() => this.onFormSubmit()}
            className="btn btn-primary"
          >
            Submit
          </button>
        </>
      );
    } else {
      return <>{this.renderReceivebutton()}</>;
    }
  }

  renderDuePayment() {
    if (this.renderInformation("due")) {
      return (
        <>
          <div className="col-6 p-2">
            <h6 className="muted mt-2">New Payment</h6>
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
        </>
      );
    }
  }

  renderReceivebutton() {
    if (!this.props.transaction.product_received) {
      return (
        <button
          onClick={() => this.setState({ modalStatus: true })}
          className="btn btn-primary"
        >
          Received
        </button>
      );
    }
  }

  renderProductReceiveStatus() {
    switch (this.props.transaction.product_received) {
      case true:
        return (
          <>
            Product Received <img width="80px" alt="loading" src={markLogo} />
          </>
        );

      case false:
        return (
          <>
            Product not Received{" "}
            <img width="80px" alt="loading" src={loading} />
          </>
        );

      default:
        return <p>Loading</p>;
    }
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Order details</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Order details</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-6 col-sm-12 text-end"></div>
                <div className="col-md-3 col-sm-12 mt-2 text-end"></div>
                <div className="col-md-1 col-sm-12 text-end"></div>
                <div className="col-md-2 col-sm-12 text-end">
                  {this.renderPayment()}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body">
            <div className="col-md-12 p-4">
              <div className="row mb-2 ">
                <div className="col-md-6">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label mt-2 ">Order #</label>
                    </div>
                    <div className="col-md-6">
                      {this.renderInformation("order_id")}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label mt-2 ">Order date</label>
                    </div>
                    <div className="col-md-6">
                      {this.renderInformation("date")}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="form-label mt-2 ">Status</label>
                    </div>
                    <div className="col-md-6">
                      {this.renderProductReceiveStatus()}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 p-2 text-end">
                  <h6>Billing address</h6>
                  <p>
                    {this.renderInformation("vendor_name")}
                    <br />
                    {this.renderInformation("vendor_contact")}
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
                      <th scope="col">Delivery Warehouse</th>
                      <th scope="col">Total(BDT)</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderInvoice()}</tbody>
                </table>
              </div>
              <div className="row mb-4 g-0">
                <div className="col-md-8 p-2"></div>
                <div className="col-md-4 p-2">
                  <div className="row mb-4 g-0 text-end">
                    <div className="col-6 p-2">
                      <h6> Sub Total</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("subTotal")}
                    </div>
                    <div className="col-6 p-2">
                      <h6 className="muted">Paid</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("paid")}
                    </div>
                    <div className="col-6 p-2">
                      <h6 className="muted">Due</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("due")}
                    </div>

                    {this.renderDuePayment()}
                  </div>
                </div>
              </div>
            </div>

            <Modal
              title="Product Receive"
              message="Are you sure that you have received product?"
              onConfirmModal={this.onConfirmModal}
              onCloseModal={this.onCloseModal}
              ok="Yes"
              cancel="No"
              status={this.state.modalStatus}
            />
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { transaction: state.order.transaction };
};

export default connect(mapStateToProps, {
  getSingleOrder,
  payDue,
  receiveOrder,
})(OrderDetail);
