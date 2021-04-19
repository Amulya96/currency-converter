import C from "../constants";

export default function updateCurrency(data) {
  return (dispatch) => {
    dispatch({
      type: C.CURRENCY,
      payload: data,
    });
  };
}