import React from "react";
import "./ProductDisplay.css";

const ProductDisplay = ({
  transaction,
  productlist,
  searchedTerm,
  onProductSelect,
  cart,
}) => {
  const renderProducts = (productlist, searchedTerm) => {
    let price = "";

    if (transaction === "order") {
      price = "buying_price";
    } else if (transaction === "sale") {
      price = "selling_price";
    }

    try {
      if (searchedTerm) {
        return productlist
          .filter(
            (product) =>
              product.name.toLowerCase().includes(searchedTerm.toLowerCase()) &&
              !cart[product.id] &&
              product.stock
          )
          .map((product) => {
            return (
              <div
                key={product.id}
                className="product-result card-deck text-center col-md-12 p-1"
                onClick={() => onProductSelect(product)}
              >
                <div className="card shadow-sm">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        alt="img"
                        className="img-thumbnail"
                        src={
                          product.image ||
                          `https://eposly.io/wp-content/uploads/2018/10/tile-contactless-chip-reader.jpg`
                        }
                      ></img>
                    </div>
                    <div className="col-md-8 pt-1">
                      <h6 className="my-0 font-weight-normal">
                        {product.name}
                      </h6>
                      <p className="mb-1 ">
                        {product[price]}
                        <small className="text-muted">tk</small>
                      </p>
                      <p className="mb-1" style={{ color: "green" }}>
                        {product.stock} on stock
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
      }

      return productlist
        .filter((product) => !cart[product.id] && product.stock)
        .map((product) => {
          return (
            <div
              key={product.id}
              className="product-result card-deck text-center col-md-12"
              onClick={() => onProductSelect(product)}
            >
              <div className="card shadow-sm">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      alt="img"
                      className="img-thumbnail"
                      src={
                        product.image ||
                        `https://eposly.io/wp-content/uploads/2018/10/tile-contactless-chip-reader.jpg`
                      }
                    ></img>
                  </div>
                  <div className="col-md-8 pt-1">
                    <h6 className="my-0 font-weight-normal">{product.name}</h6>
                    <p className="mb-1 ">
                      {product[price]}
                      <small className="text-muted">tk</small>
                    </p>
                    <p className="mb-1" style={{ color: "green" }}>
                      {product.stock} on stock
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        });
    } catch (error) {
      return null;
    }
  };

  if (productlist) {
    return (
      <div className="row">{renderProducts(productlist, searchedTerm)}</div>
    );
  } else return null;
};

export default ProductDisplay;
