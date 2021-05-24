import { isEmpty } from "lodash";
import React from "react";

const Cart = ({
  transaction,
  cart,
  onQuantityChange,
  onProductDelete,
  checkCart,
}) => {
  const renderCart = (cart, serial) => {
    cart = Object.values(cart);
    let price = "";

    if (transaction === "order") {
      price = "buying_price";
    } else if (transaction === "sale") {
      price = "selling_price";
    }

    if (cart) {
      return cart.map((product) => {
        subTotal += product[price] * product.quantity;
        return (
          <tr key={product.id} className="table-row">
            <th scope="row" className="table-row-td">
              {++serial}
            </th>
            <td className="table-row-td">{product.name}</td>
            <td className="table-row-td">{product.stock}</td>
            <td className="table-row-td">{product[price]}</td>
            <td>
              <input
                onChange={(e) => {
                  onQuantityChange(product.id, product.stock, e.target.value);
                }}
                min="0"
                key={product.id}
                value={product.quantity}
                type="number"
                className="form-control"
                style={{ textAlign: "center" }}
              />
            </td>
            <td className="table-row-td">
              {product[price] * product.quantity}
            </td>
            <td className="table-row-td">
              <button
                onClick={() => onProductDelete(product.id)}
                className="btn-transparent"
              >
                <i className="fas fa-times"></i>
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  let serial = 0;
  let subTotal = 0;

  if (!isEmpty(cart)) {
    return (
      <div>
        <div className="table-responsive gol-border ">
          <table className="table table-sm text-center table-hover">
            <thead>
              <tr>
                <th style={{ width: "2%" }}>No.</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th style={{ width: "10%" }}>Quantity</th>
                <th>Total(BDT)</th>
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-gear"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderCart(cart, serial)}
              <tr>
                <th colSpan={5}>Subtotal</th>
                <th scope="col">{subTotal}</th>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary float-end"
          onClick={() => checkCart(subTotal)}
        >
          Proceed to check out
        </button>
      </div>
    );
  } else return null;
};

export default Cart;
