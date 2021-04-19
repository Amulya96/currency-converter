import C from "../constants";

export default function updateHistoricalCurrency(data) {
  return (dispatch) => {
    dispatch({
      type: C.HISTORICAL_CURRENCY,
      payload: data,
    });
  };
}
