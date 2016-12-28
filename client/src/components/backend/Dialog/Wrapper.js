import React, { PureComponent, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class DialogWrapper extends PureComponent {

  static displayName = "Dialog.Wrapper";

  static propTypes = {
    closeUrl: PropTypes.string,
    closeCallback: PropTypes.func,
    showCloseButton: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    maxWidth: PropTypes.number,
    className: PropTypes.string
  };

  static defaultProps = {
    showCloseButton: true,
    closeOnOverlayClick: true
  }

  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  leave(callback) {
    this.setState({ leaving: true });
    setTimeout(callback, 200);
  }

  closeWithUrlChange() {
    this.leave(() => {
      browserHistory.push(this.props.closeUrl);
    });
  }

  closeWithNoAction() {
    this.leave(() => {});
  }

  closeWithCallback() {
    this.leave(this.closeCallback);
  }

  doClose() {
    if (this.props.closeUrl) return this.closeWithUrlChange();
    if (!this.props.closeHandler) return this.closeWithCallback();
    return this.closeWithNoAction();
  }

  handleOverlayClick(event) {
    if (this.props.closeOnOverlayClick) this.doClose();
  }

  handleCloseClick(event) {
    this.doClose();
  }

  style() {
    const style = {};
    if (this.props.maxWidth) style.maxWidth = this.props.maxWidth;
    return style;
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="dialog"
        // True value required to enable transform
        /* eslint-disable */
        transitionAppear={true}
        /* eslint-enable */
        transitionEnter={false}
        transitionAppearTimeout={1}
        transitionLeaveTimeout={200}
      >
        {this.state.leaving ?
          null
          :
          <div
            key="dialog"
            className="dialog-primary dialog-appear"
          >
            <div className="dialog-overlay" onClick={this.handleOverlayClick}></div>
            <div
              className={classnames('dialog-box', this.props.className)}
              style={this.style()}
            >
              { this.props.showCloseButton ?
                <div onClick={this.handleCloseClick} className="close-button-primary">
                  <i className="manicon manicon-x"></i>
                  <span className="screen-reader-text">
                  Close Dialog
                </span>
                </div>
                : null
              }
              {this.props.children}
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    );
  }

}
