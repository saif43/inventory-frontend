import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getSalesReport } from "../../actions/salesAction";
import Navbar from "../../Reuseable-component/Navbar";
import DataTable from "react-data-table-component";
import Chart from "chart.js";
const customStyles = {
  rows: {
    style: {
      // override the row height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  headCells: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};
class SellingReport extends Component {
  state = { report: null, filtertype: "date" };
  componentDidMount() {
    this.props.getSalesReport("daily");
    this.setState({ filtertype: "daily", report: this.props.report });
  }
  updatereport(type) {
    this.props.getSalesReport(type);
    this.setState({ filtertype: type });
  }

  componentDidUpdate() {
    if (this.state.report !== this.props.report) {
      this.generatechart();
      this.setState({ report: this.props.report });
    }
  }

  generatechart() {
    let labelsArray = [];
    let bills = [];
    if (this.state.filtertype === "daily") {
      this.props.report.map(({ date }) => {
        return labelsArray.push(date);
      });
    } else if (this.state.filtertype === "weekly") {
      this.props.report.map(({ week }) => {
        return labelsArray.push("Week - " + week);
      });
    } else if (this.state.filtertype === "yearly") {
      this.props.report.map(({ year }) => {
        return labelsArray.push(year);
      });
    }

    this.props.report.map(({ bill }) => {
      return bills.push(bill);
    });
    var ctx3 = document.getElementById("myChart3");
    new Chart(ctx3, {
      type: "line",
      data: {
        labels: labelsArray,
        datasets: [
          {
            label: "Bill (BDT)",
            data: bills,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  getColumns = () => {
    if (this.state.filtertype === "daily") {
      return [
        {
          name: "Date",
          selector: "date",
          sortable: true,
          center: true,
        },
        {
          name: "Bill",
          selector: "bill",
          sortable: true,
          center: true,
        },
      ];
    }
    if (this.state.filtertype === "weekly") {
      return [
        {
          name: "Week",
          selector: "week",
          sortable: true,
          center: true,
        },
        {
          name: "Bill",
          selector: "bill",
          sortable: true,
          center: true,
        },
      ];
    }
    if (this.state.filtertype === "yearly") {
      return [
        {
          name: "Year",
          selector: "year",
          sortable: true,
          center: true,
        },
        {
          name: "Bill",
          selector: "bill",
          sortable: true,
          center: true,
        },
      ];
    }
  };

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Sales Report</title>
        </Helmet>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Sales Report</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-6 col-sm-12 text-end"></div>
                <div className="col-md-3 col-sm-12 text-end"></div>
                <div className="col-md-3 col-sm-12 text-end">
                  <button
                    className="btn btn-primary m-1"
                    type="button"
                    onClick={() => {
                      this.updatereport("daily");
                    }}
                  >
                    Daily
                  </button>

                  <button
                    className="btn btn-primary m-1"
                    type="button"
                    onClick={() => {
                      this.updatereport("weekly");
                    }}
                  >
                    Weekly
                  </button>

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      this.updatereport("yearly");
                    }}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 main-body">
            <div className="col-md-8 p-2">
              <canvas id="myChart3"></canvas>
            </div>

            <div className="col-md-4">
              <DataTable
                noHeader
                responsive
                columns={this.getColumns()}
                data={this.props.report}
                // striped
                highlightOnHover
                // pagination
                customStyles={customStyles}
                paginationRowsPerPageOptions={[5, 10, 15, 100]}
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
    report: Object.values(state.sales.report),
  };
};

export default connect(mapStateToProps, { getSalesReport })(SellingReport);
