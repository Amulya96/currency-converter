const styles = (theme) => ({
  currencyDiv: {
    position: "relative",
    display: "inline-flex",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: 3,
    padding: 5,
    margin: 10,
    width: 300,
    "& button": {
      position: "initial",
      borderColor: "transparent",
      backgroundColor: "transparent",
      "& span": {
        fontSize: 16,
        marginLeft: 4,
        fontWeight: 500,
        color: "#1F2329",
        "& i": {
          "&:before": {
            verticalAlign: "middle",
          },
        },
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&:after ": {
        position: "absolute",
        display: "block",
        content: '""',
        borderColor: "transparent",
        borderStyle: "solid",
        top: 20,
        borderWidth: "0.4rem 0.4rem 0 0.4rem",
        right: 10,
        borderTopColor: "#333",
      },
    },
  },
  clsListItem: {
    cursor: "pointer",
    "&:hover": {
      color: "#3370FC",
    },
  },
});

export default styles;
