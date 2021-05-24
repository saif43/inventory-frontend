import React, { Component } from "react";
import { connect } from "react-redux";
import { getStock } from "../../../actions/productAction";
import Navbar from "../../../Reuseable-component/Navbar";
import Cart from "./../Reuseable-component/Cart";
import ProductDisplay from "./../Reuseable-component/ProductDisplay";

import Helmet from "react-helmet";
import _ from "lodash";
import history from "../../../history";

class SalesCreate extends Component {
  state = { searchText: "", cart: {} };

  componentDidMount() {
    this.props.getStock();
  }

  checkCart = (subTotal) => {
    const cart = Object.values(this.state.cart);
    let quantityAlert = false;

    cart.forEach((product) => {
      if (!product.quantity) {
        quantityAlert = true;
        return;
      }
    });

    if (!quantityAlert) {
      history.push({
        pathname: "/sales/payment",
        state: { cart: cart, subTotal: subTotal },
      });
    }
  };

  onProductDelete = (productId) => {
    let cart = this.state.cart;

    cart = _.omit(cart, productId);

    this.setState({ cart });
  };

  onQuantityChange = (productId, stock, quantity) => {
    const cart = this.state.cart;

    if (quantity <= stock) {
      cart[productId]["quantity"] = quantity;

      this.setState({ cart });
    }
  };

  onProductSelect = (product) => {
    const cart = this.state.cart;
    cart[product.id] = product;
    cart[product.id]["quantity"] = 1;

    this.setState({ cart });
  };

  onProductSearch = (searchText) => {
    this.setState({ searchText });

    let searchedResult = this.props.stock.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    searchedResult.length ? this.renderAlert(false) : this.renderAlert(true);
  };

  renderAlert = (status) => {
    this.setState({ notfoundalert: status });
  };

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Create Sales</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h3>Create sale</h3>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body ">
            <div className="col-md-3 p-2 product-suggestions">
              <input
                onChange={(e) => this.onProductSearch(e.target.value)}
                className="form-control"
                placeholder="Product Search"
              />
              <ProductDisplay
                transaction="sale"
                productlist={this.props.stock}
                searchedTerm={this.state.searchText}
                onProductSelect={this.onProductSelect}
                cart={this.state.cart}
                renderAlert={this.renderAlert}
              />
              <span className="p-2 text-danger">
                {this.state.notfoundalert ? "Product not found" : ""}
              </span>
            </div>
            <div className="col-md-9 p-2">
              <Cart
                transaction="sale"
                onQuantityChange={this.onQuantityChange}
                cart={this.state.cart}
                onProductDelete={this.onProductDelete}
                checkCart={this.checkCart}
              />
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
  };
};

export default connect(mapStateToProps, { getStock })(SalesCreate);
