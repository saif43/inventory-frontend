import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct, updateProduct } from "../../actions/productAction";
import Navbar from "../../Reuseable-component/Navbar";
import ImageUploader from "../../Reuseable-component/ImageUploader";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
class ProductUpdate extends Component {
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
      this.props.updateProduct(
        this.props.match.params.id,
        name,
        stock,
        buying_price,
        selling_price,
        image,
        stock_alert_amount
      );
    }
  };

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    const {
      name,
      stock,
      buying_price,
      selling_price,
      image,
      stock_alert_amount,
    } = this.props.detail;

    this.setState({
      name,
      stock,
      buying_price,
      selling_price,
      image,
      stock_alert_amount,
    });
  }

  renderProductDetail() {
    if (this.props.detail) {
      return (
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
              onChange={(e) => this.setState({ buying_price: e.target.value })}
            />
          </div>
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Selling Price</label>
            <input
              className="form-control mb-3 niche_border"
              type="number"
              value={this.state.selling_price}
              onChange={(e) => this.setState({ selling_price: e.target.value })}
            />
          </div>

          <div className="col-md-6 col-sm-12">
            <label className="form-label">Stock Alert Amount</label>
            <input
              className="form-control mb-3 niche_border"
              value={this.state.stock_alert_amount}
              onChange={(e) =>
                this.setState({ stock_alert_amount: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="form-label">Brand</label>
            <input className="form-control mb-3 niche_border" />
          </div>

          <div className="col-md-12 col-sm-12">
            <div>
              <button className="btn btn-primary mt-3" onClick={this.onSubmit}>
                Update
              </button>
              <Link
                to={`/product/detail/${this.props.match.params.id}`}
                className="btn btn-secondary mt-3"
                style={{ marginLeft: "2%" }}
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Update Product</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Product Update</h1>
          </div>
          <div className="row main-body">
            <div className="row p-4">
              <div className="col-md-5 col-sm-12">
                <ImageUploader onImageSelect={this.onImageSelect} />
              </div>
              <div className="col-md-7 col-sm-12">
                {this.renderProductDetail()}
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
    detail: state.product.detail,
  };
};

export default connect(mapStateToProps, { getProduct, updateProduct })(
  ProductUpdate
);
