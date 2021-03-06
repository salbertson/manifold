import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconResourceSpreadsheet extends Component {
  static displayName = "Icon.ResourceSpreadsheet";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 64,
    fill: "currentColor"
  };

  render() {
    const { iconClass, size, fill, stroke } = this.props;
    const classes = classnames("manicon-svg", iconClass);

    return (
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        viewBox="0 0 64 64"
      >
        <path d="M5.99999996,12.9999 L5.99999996,52 L58,52 L58,12.9999 L5.99999996,12.9999 Z M60,10.9999 L60,54 L3.99999996,54 L3.99999996,10.9999 L60,10.9999 Z M59,22 L59,24 L4.99999996,24 L4.99999996,22 L59,22 Z M16,12 L18,12 L18,53 L16,53 L16,12 Z" />
      </svg>
    );
  }
}
