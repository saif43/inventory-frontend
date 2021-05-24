import dateformat from "dateformat";
import Chart from "chart.js";

import React, { Component } from "react";

export default class Canvas extends Component {
  state = { report: [] };

  componentDidMount() {
    this.setState({ report: this.props.report });
    this.getGraph();
  }

  componentDidUpdate() {
    if (
      JSON.stringify(this.props.report) !== JSON.stringify(this.state.report)
    ) {
      this.setState({ report: this.props.report });
      this.getGraph();
    }
  }

  getGraph = () => {
    const { report, id, chartstyle } = this.props;

    const ctx = document.getElementById(id);
    let labelsArray = [];
    let bills = [];

    report.forEach(({ date, bill }) => {
      labelsArray.push(dateformat(date, "mmm d"));
      bills.push(bill);
    });
    try {
      new Chart(ctx, {
        type: chartstyle,
        data: {
          labels: labelsArray,
          datasets: [
            {
              label: "Bill (BDT)",
              data: bills,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderWidth: 0,
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
    } catch (error) {}
  };

  render() {
    return <canvas id={this.props.id} width="400" height="400"></canvas>;
  }
}
