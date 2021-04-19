import C from "../../actions/constants";
import { forOwn } from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case C.CURRENCY:
      return {
        ...state,
        currency: parseCurrency(action.payload),
      };
    case C.HISTORICAL_CURRENCY:
      return {
        ...state,
        historicalCurrency: parsehistoricalCurrency(action.payload),
      };
    default:
      return state;
  }
};

function parseCurrency(data) {
  let newData = JSON.parse(data);
  return newData.bpi;
}

function parsehistoricalCurrency(data) {
  let newData = JSON.parse(data);
  let result = [];
  forOwn(newData.bpi, (vaule, key) => {
    let obj = {
      name: key,
      value: vaule,
    };
    result.push(obj);
  });
  return result;
}
