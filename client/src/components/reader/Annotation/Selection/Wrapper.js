import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Selection from "../Selection";
import HigherOrder from "containers/global/HigherOrder";
import nl2br from "nl2br";

export default class AnnotationSelectionWrapper extends PureComponent {
  static displayName = "Annotation.Selection.Wrapper";

  static propTypes = {
    truncate: PropTypes.number,
    subject: PropTypes.string,
    onViewInText: PropTypes.func,
    onAnnotate: PropTypes.func,
    onLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      editorOpen: false
    };
  }

  get viewable() {
    return !!this.props.onViewInText;
  }

  get annotatable() {
    return !!this.props.onAnnotate;
  }

  get canLogin() {
    return !!this.props.onLogin;
  }

  maybeTruncateSelection() {
    const { subject, truncate } = this.props;
    if (truncate && subject && subject.length > truncate) {
      return <Selection.Truncated selection={subject} truncate={truncate} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: nl2br(subject) }} />;
  }

  render() {
    return (
      <div className="selection-text">
        <div className="container">
          <i className="manicon manicon-quote" aria-hidden="true" />
          {this.maybeTruncateSelection()}
        </div>
        {this.viewable && (
          <button className="annotate-button" onClick={this.props.onViewInText}>
            {"View In Text"}
          </button>
        )}
        {this.annotatable && (
          <Fragment>
            <HigherOrder.Authorize kind="any">
              <button
                className="annotate-button"
                onClick={this.props.onAnnotate}
              >
                {"Annotate"}
              </button>
            </HigherOrder.Authorize>
            {this.canLogin && (
              <HigherOrder.Authorize kind="unauthenticated">
                <button
                  className="annotate-button"
                  onClick={this.props.onLogin}
                >
                  {"Login to annotate"}
                </button>
              </HigherOrder.Authorize>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
