import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "./LayoutStyles";
import Typography from "@material-ui/core/Typography";
import CurrencyData from "../currencyData/CurrencyData";
import updateCurrency from "../../actions/currency/updateCurrency";
import updateHistoricalCurrency from "../../actions/currency/updateHistoricalCurrency";
import axios from "axios";
import Chart from "../chart/Chart";

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    let self = this;
    axios({
      method: "GET",
      url: "https://api.coindesk.com/v1/bpi/currentprice.json",
    })
      .then(function (response) {
        self.props.updateCurrency(response.request.response);
      })
      .catch(function (error) {
        setTimeout(function () {
          console.log(error);
        });
      });

    axios({
      method: "GET",
      url:
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&start=2013-09-01&end=2013-09-10",
    })
      .then(function (response) {
        self.props.updateHistoricalCurrency(response.request.response);
      })
      .catch(function (error) {
        setTimeout(function () {
          console.log(error);
        });
      });
  };

  fetchCurrency = () => {
    let data = [];
    data.push(<CurrencyData key="currency" />);
    return data;
  };

  displayGraph = () => {
    let graph = [];
    graph.push(<Chart key="chart" />);
    return graph;
  };

  prepareLayout = () => {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}>
        <Grid className={classes.mainDiv}>
          <Grid className={classes.currency}>
            <Typography variant="h6" className={classes.text}>
              1 Bitcoin Equals
            </Typography>
            <div key="layoutCurrency">{this.fetchCurrency()}</div>
          </Grid>
          <Grid className={classes.graph}>{this.displayGraph()}</Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.prepareLayout();
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
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Layout))
);
