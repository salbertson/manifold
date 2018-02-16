import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Notifications } from "containers/global";

export default class HeaderNotification extends Component {
  render() {
    const output = <Notifications {...this.props} />;
    if (__SERVER__) return output;

    // If we're in the client, render it into a portal so we can keep it at the top of the
    // z-index stack.
    const domTarget = document.getElementById("global-notification-container");
    return ReactDOM.createPortal(output, domTarget);
  }
}
