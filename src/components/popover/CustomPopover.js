import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./CustomPopoverStyles";
import Popover from "@material-ui/core/Popover";

class CustomPopOver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: Boolean(this.props.anchorEl),
      anchorEl: this.props.anchorEl,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.anchorEl !== state.anchorEl) {
      return {
        anchorEl: props.anchorEl,
        isPopoverOpen: Boolean(props.anchorEl),
      };
    }
    return null;
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, content } = this.props;
    const { isPopoverOpen, anchorEl } = this.state;
    let popoverContent = [];
    popoverContent = (
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {content}
      </Popover>
    );
    return <div>{popoverContent}</div>;
  }
}

export default withStyles(styles)(CustomPopOver);
