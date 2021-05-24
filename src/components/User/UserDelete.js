import React, { Component } from "react";
import { deleteUser } from "../../actions/userAction";
import Modal from "../../Reuseable-component/Modal";
import { connect } from "react-redux";

class UserDelete extends Component {
  state = { modalStatus: false };

  onCloseModal = () => {
    this.setState({ modalStatus: false });
  };

  onConfirmModal = () => {
    // this.props.deleteWarehouse(this.props.id);
    this.setState({ modalStatus: false });

    const { id, usertype } = this.props;
    this.props.deleteUser(id, usertype);
  };

  renderModal() {
    return (
      <Modal
        title="Delete User"
        message="Are you sure that you want to delete this user?"
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
        <button
          onClick={() => this.setState({ modalStatus: true })}
          className="btn glass btn-secondary"
        >
          Delete
        </button>
        {this.renderModal()}
      </>
    );
  }
}

export default connect(null, { deleteUser })(UserDelete);
