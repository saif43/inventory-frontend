import React, { Component } from "react";
import { deleteWarehouse } from "../../actions/warehouseAction";
import Modal from "./../../Reuseable-component/Modal";
import { connect } from "react-redux";

class WarehouseDelete extends Component {
  state = { modalStatus: false };

  onCloseModal = () => {
    this.setState({ modalStatus: false });
  };

  onConfirmModal = () => {
    this.props.deleteWarehouse(this.props.id);
    this.setState({ modalStatus: false });
  };

  getWaringMsg = () => {
    return (
      <>
        <b className="text-danger">Warning: </b>This warehouse is not empty. You
        might want to Move Products from current warehouse to Shop.
      </>
    );
  };

  renderModal() {
    if (!this.props.empty) {
      return (
        <Modal
          title="Delete Warehouse"
          message={this.getWaringMsg()}
          onConfirmModal={this.onConfirmModal}
          onCloseModal={this.onCloseModal}
          ok="Force Delete"
          cancel="Cancel"
          status={this.state.modalStatus}
        />
      );
    }

    return (
      <Modal
        title="Delete Warehouse"
        message="Are you sure that you want to delete this warehouse?"
        onConfirmModal={this.onConfirmModal}
        onCloseModal={this.onCloseModal}
        ok="Delete"
        cancel="Cancel"
        status={this.state.modalStatus}
      />
    );
  }

  render() {
    return (
      <>
        <span
          onClick={() => {
            this.setState({ modalStatus: true });
          }}
          className="warehouse-option"
        >
          Delete
        </span>
        {this.renderModal()}
      </>
    );
  }
}

export default connect(null, { deleteWarehouse })(WarehouseDelete);
