import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconGlobe extends Component {
  static displayName = "Icon.Globe";

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
        aria-hidden="true"
      >
        <path d="M34.4693,44.3522 C25.557799,44.3522 18.3336,37.128001 18.3336,28.2165 C18.3336,19.3049989 25.557799,12.0808 34.4693,12.0808 C43.3808011,12.0808 50.605,19.3049989 50.605,28.2165 C50.605,37.128001 43.3808011,44.3522 34.4693,44.3522 Z M34.4693,42.3522 C42.2762316,42.3522 48.605,36.0234315 48.605,28.2165 C48.605,20.4095684 42.2762316,14.0808 34.4693,14.0808 C26.6623685,14.0808 20.3336,20.4095684 20.3336,28.2165 C20.3336,36.0234315 26.6623685,42.3522 34.4693,42.3522 Z M41.9517835,41.4480784 L43.5240165,40.2119217 L47.2134076,44.9043545 L46.3316475,45.5077638 C36.7383433,52.0726882 23.639511,49.6177014 17.0745865,40.0243973 C10.5096619,30.4310932 12.9646485,17.3322609 22.5579525,10.7673362 L23.6874475,12.4178637 C15.0057047,18.3589855 12.7839923,30.2131595 18.725114,38.8949024 C24.4633698,47.280198 35.7177574,49.6391003 44.3020758,44.4373491 L41.9517835,41.4480784 Z M26.876363,15.3071514 L25.225837,16.4366486 L19.372937,7.88384856 L21.023463,6.75435136 L26.876363,15.3071514 Z M35.4693,56.3858 L33.4693,56.3858 L33.4693,48.2644 L35.4693,48.2644 L35.4693,56.3858 Z M21.716,57.2456 L21.716,55.2456 L47.5028,55.2456 L47.5028,57.2456 L21.716,57.2456 Z" />
      </svg>
    );
  }
}
