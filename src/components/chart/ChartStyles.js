const styles = (theme) => ({
  graphGrid: {
    "& .recharts-default-tooltip": {
      border: "none !important",
      boxShadow: "0px 3px 16px #42474E34",
      "& .recharts-tooltip-label": {
        fontSize: 13,
        fontWeight: 500,
      },
      "& .recharts-tooltip-item-list": {
        fontSize: 13,
        fontWeight: 500,
        "& li": {
          fontSize: 13,
          display: "block",
        },
      },
    },
  },
});

export default styles;
