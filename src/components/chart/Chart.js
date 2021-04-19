import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChartStyles";
import updateCurrency from "../../actions/currency/updateCurrency";
import updateHistoricalCurrency from "../../actions/currency/updateHistoricalCurrency";
import { isEmpty } from "lodash";
import {LineChart,Line,XAxis,YAxis, Tooltip } from "recharts";

class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const { historicalCurrency } = this.props;
    if (
      historicalCurrency != prevProps.historicalCurrency &&
      !isEmpty(historicalCurrency)
    ) {
      this.displayGraph();
    }
  }

  displayGraph = () => {
    const { classes } = this.props;
    let data = [];
    data.push(
      <div key="graph" classes={{ root: classes.graphGrid }}>
        <LineChart
          width={500}
          height={300}
          data={this.props.historicalCurrency}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="value"
            type="monotone"
            dot={{ stroke: "#F493F4", strokeWidth: 4 }}
            strokeWidth={3}
          />
        </LineChart>
      </div>
    );
    return data;
  };

  render() {
    return this.displayGraph();
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    historicalCurrency: state.currency.historicalCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateCurrency: updateCurrency,
      updateHistoricalCurrency: updateHistoricalCurrency,
    },
    dispatch
  );
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Chart))
);
