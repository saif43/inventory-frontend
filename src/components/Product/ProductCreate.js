import React, { Component } from "react";
import Navbar from "../../Reuseable-component/Navbar";
import { connect } from "react-redux";
import { createProduct } from "../../actions/productAction";
import ImageUploader from "../../Reuseable-component/ImageUploader";
import Helmet from "react-helmet";

//ref: https://codesandbox.io/s/react-images-uploading-demo-u0khz?file=/src/index.js

class ProductCreate extends Component {
  state = {
    image: null,
    name: "",
    stock: 0,
    buying_price: 0,
    selling_price: 0,
    stock_alert_amount: 0,
  };

  onImageSelect = (image) => this.setState({ image });

  onSubmit = () => {
    const {
      name,
      stock,
      buying_price,
      selling_price,
      image,
      stock_alert_amount,
    } = this.state;

    if (name && stock && buying_price && selling_price) {
      this.props.createProduct(
        name,
        stock,
        buying_price,
        selling_price,
        image,
        stock_alert_amount
      );
    }
  };

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Add Product</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10">
          <div className="row mb-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
              <h3>Add product</h3>
            </div>
          </div>
          <div className="row main-body">
            <div className="row p-4">
              <div className="col-md-5 col-sm-12">
                <ImageUploader onImageSelect={this.onImageSelect} />
              </div>
              <div className="col-md-7 col-sm-12">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <label className="form-label ">Product Name</label>
                    <input
                      className="form-control mb-3 niche_border"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <label className="form-label">Shop stock</label>
                    <input
                      type="number"
                      className="form-control mb-3 niche_border"
                      value={this.state.stock}
                      onChange={(e) => this.setState({ stock: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <label className="form-label">Buying Price</label>
                    <input
                      className="form-control mb-3 niche_border"
                      type="number"
                      value={this.state.buying_price}
                      onChange={(e) =>
                        this.setState({ buying_price: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <label className="form-label">Selling Price</label>
                    <input
                      className="form-control mb-3 niche_border"
                      type="number"
                      value={this.state.selling_price}
                      onChange={(e) =>
                        this.setState({ selling_price: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <label className="form-label">Category</label>
                    <input
                      name="selling_price"
                      className="form-control mb-3 niche_border"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="form-label">Brand</label>
                    <input
                      name="selling_price"
                      className="form-control mb-3 niche_border"
                    />
                  </div>

                  <div className="col-md-12 col-sm-12">
                    <button
                      onClick={() => this.onSubmit()}
                      className="btn btn-success text-end"
                    >
                      Save
                    </button>
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

export default connect(null, { createProduct })(ProductCreate);
