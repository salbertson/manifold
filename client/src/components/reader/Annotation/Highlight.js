import React, { PureComponent } from "react";
import { Utility } from "components/frontend";
import PropTypes from "prop-types";
import HigherOrder from "containers/global/HigherOrder";
import { connect } from "react-redux";
import { annotationsAPI, requests } from "api";
import { entityStoreActions } from "actions";

const { request } = entityStoreActions;

class HighlightDetail extends PureComponent {
  static displayName = "Annotation.Highlight";

  static propTypes = {
    annotation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    visitHandler: PropTypes.func
  };

  deleteAnnotation = () => {
    const { annotation } = this.props;
    const call = annotationsAPI.destroy(annotation.id);
    const options = { removes: { type: "annotations", id: annotation.id } };
    const res = this.props.dispatch(
      request(call, requests.rAnnotationDestroy, options)
    );
    return res.promise;
  };

  handleVisitHighlight = event => {
    event.preventDefault();
    this.props.visitHandler(this.props.annotation);
  };

  render() {
    const annotation = this.props.annotation;
    return (
      <div className="annotation-highlight-detail">
        <span className="annotation-selection">
          {annotation.attributes.subject}
        </span>

        <nav className="utility">
          <ul>
            {this.props.visitHandler ? (
              <li>
                <button onClick={this.handleVisitHighlight}>
                  {"View In Text"}
                </button>
              </li>
            ) : null}
            <HigherOrder.Authorize entity={annotation} ability={"delete"}>
              <li>
                <Utility.ConfirmableButton
                  label="Delete"
                  confirmHandler={this.deleteAnnotation}
                />
              </li>
            </HigherOrder.Authorize>
          </ul>
        </nav>
      </div>
    );
  }
}

export default connect()(HighlightDetail);
