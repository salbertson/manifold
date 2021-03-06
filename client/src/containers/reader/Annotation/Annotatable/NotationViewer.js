import React, { PureComponent } from "react";
import { Notation as NotationComponents } from "components/reader";
import PropTypes from "prop-types";

export default class AnnotatableNotationViewer extends PureComponent {
  static propTypes = {
    sectionId: PropTypes.string.isRequired,
    textId: PropTypes.string.isRequired,
    notations: PropTypes.array,
    annotations: PropTypes.array,
    containerSize: PropTypes.number,
    bodySelector: PropTypes.string
  };

  render() {
    return (
      <NotationComponents.Viewer.List
        sectionId={this.props.sectionId}
        textId={this.props.textId}
        notations={this.props.notations}
        annotations={this.props.annotations}
        containerSize={this.props.containerSize}
        bodySelector={this.props.bodySelector}
      />
    );
  }
}
