import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import styles from "./CurrencyDataStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CustomPopOver from "../popover/CustomPopover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { isEmpty, forOwn, cloneDeep } from "lodash";
import axios from "axios";
import updateHistoricalCurrency from "../../actions/currency/updateHistoricalCurrency";

const currencyList = [
  { id: "1", value: "USD", label: "United States Dollar" },
  { id: "2", value: "GBP", label: "British Pound Sterling" },
  { id: "3", value: "EUR", label: "Euro" },
];

class CurrencyData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      currencyValue: "United States Dollar",
      id: "USD",
      cRate: 0,
    };
  }

  componentDidMount() {
    const { historicalCurrency, currency } = this.props;
    if (!isEmpty(currency)) {
      this.updateCurrency();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { historicalCurrency, currency } = this.props;
    if (historicalCurrency != prevProps.historicalCurrency && !isEmpty(historicalCurrency)) {
      this.updateCurrency();
    }
    if (currency != prevProps.currency && !isEmpty(currency)) {
      this.updateCurrency();
    }
  }

  updateCurrency = () => {
    const { historicalCurrency, currency } = this.props;
    const { id } = this.state;

    if (!isEmpty(currency)) {
      forOwn(currency, (value, key) => {
        if (key === id) {
          this.setState({ cRate: value.rate });
        }
      });
    }
  };

  handleClick = (event, elementId) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleCurrencySelect = (value) => {
    let self = this;
    self.setState({
      currencyValue: value.label,
      id: value.value,
    });
    this.handlePopoverClose();
    let URL = "";
    if (value.value === "USD") {
      URL =
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&start=2013-09-01&end=2013-09-10";
    } else if (value.value === "GBP") {
      URL =
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=GBP&start=2013-09-01&end=2013-09-10";
    } else if (value.value === "EUR") {
      URL =
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=2013-09-01&end=2013-09-10";
    }
    axios({
      method: "GET",
      url: URL,
    })
      .then(function (response) {
        self.props.updateHistoricalCurrency(
          cloneDeep(response.request.response)
        );
      })
      .catch(function (error) {
        setTimeout(function () {
          console.log(error);
        });
      });
  };

  currencySelection = () => {
    const { classes } = this.props;
    let sortData = [];
    currencyList.map((item, index) => {
      sortData.push(
        <List
          disablePadding
          component="ul"
          aria-label="main mailbox folders"
          key={index}
        >
          <ListItem
            classes={{ root: classes.clsListItem }}
            component="li"
            onClick={() => {
              this.handleCurrencySelect(item);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        </List>
      );
    });
    return sortData;
  };

  fetchCurrency = () => {
    const { classes } = this.props;
    const { anchorEl, currencyValue } = this.state;
    let data = [];
    data.push(
      <div className={classes.currencyDiv} key={"fetchCurrency"}>
        <Button id="currency" onClick={(event) => this.handleClick(event)}>
          {currencyValue}
        </Button>
        <React.Fragment>
          <CustomPopOver
            id={"currency"}
            anchorEl={anchorEl}
            onClose={this.handlePopoverClose}
            content={this.currencySelection()}
          />
        </React.Fragment>
      </div>
    );
    return data;
  };

  render() {
    const { classes, currency } = this.props;
    const { anchorEl, currencyValue, id, cRate } = this.state;
    return (
      <Grid className={classes.currencyDataDiv}>
        <div className={classes.mainDiv}>{this.fetchCurrency()}</div>
        <Typography variant="h4" className={classes.text}>
          {cRate + " " + currencyValue}
        </Typography>
      </Grid>
    );
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
      updateHistoricalCurrency: updateHistoricalCurrency,
    },
    dispatch
  );
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CurrencyData))
);
