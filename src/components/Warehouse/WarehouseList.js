import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { getAllWarehouse } from "../../actions/warehouseAction";
import Navbar from "../../Reuseable-component/Navbar";
import WarehouseCreate from "./WarehouseCreate";
import WarehouseDetail from "./WarehouseDetail";
import "./WarehouseList.css";
import Animation from "../../Reuseable-component/Animation";
import WarehouseDelete from "./WarehouseDelete";

class WarehouseList extends Component {
  state = { warehouseid: 0, warehouseName: null };
  componentDidMount() {
    this.props.getAllWarehouse();
  }

  renderWarehouseList() {
    if (this.props.warehouse) {
      return this.props.warehouse.map(({ id, name, empty }) => {
        return (
          <div key={id} className="col-md-4 col-sm-12 p-4 b">
            <div className="row">
              <div className="col-4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/470/383/non_2x/warehouse-isometric-template-vector.jpg"
                  width="100%"
                  alt="static warehouse"
                />
              </div>
              <div className="col-8">
                <h5>{name}</h5>
                <ul className="list-unstyled">
                  <li>10 items in stock</li>
                </ul>

                <Link to={`/warehouse/detail/${id}`}>View details</Link>
                {"  "}
                <WarehouseDelete id={id} empty={empty} />
              </div>
            </div>
          </div>
        );
      });
    }
  }

  renderContent() {
    if (this.state.warehouseid === 0) {
      return (
        <Navbar>
          <Helmet>
            <title>Warehouse list</title>
          </Helmet>
          <main className="col-md-9 ms-sm-auto col-lg-10">
            <div className="row mb-3">
              <WarehouseCreate />
            </div>
            <div className="row mt-3 main-body main-body-with-table">
              {this.renderWarehouseList()}
            </div>
          </main>
        </Navbar>
      );
    }
    return (
      <WarehouseDetail
        id={this.state.warehouseid}
        name={this.state.warehouseName}
        getAllWarehouse={this.details}
      />
    );
  }

  render() {
    return <Animation>{this.renderContent()}</Animation>;
  }
}

const mapStateToProps = (state) => {
  if (state.warehouse.warehouseList)
    return {
      warehouse: Object.values(state.warehouse.warehouseList),
    };
  else return {};
};

export default connect(mapStateToProps, { getAllWarehouse })(WarehouseList);
