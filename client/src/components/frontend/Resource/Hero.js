import React, { Component } from "react";
import PropTypes from "prop-types";
import { ResourceList } from "components/frontend";

export default class ResourceHero extends Component {
  static displayName = "Resource.Hero";

  static propTypes = {
    resource: PropTypes.object,
    slideOptions: PropTypes.object
  };

  static defaultProps = {
    slideOptions: {}
  };

  getFigureByType = resource => {
    let output = null;
    switch (resource.attributes.kind) {
      case "image":
        output = (
          <div className="resource-slide-figure">
            <ResourceList.Slide.SlideImage
              resource={resource}
              {...this.props.slideOptions}
            />
          </div>
        );
        break;
      case "video":
        output = (
          <div className="resource-slide-figure">
            <ResourceList.Slide.SlideVideo
              resource={resource}
              {...this.props.slideOptions}
            />
          </div>
        );
        break;
      case "interactive":
        output = (
          <div className="resource-slide-figure resource-slide-interactive">
            <ResourceList.Slide.SlideInteractive
              resource={resource}
              noPlaceholder
              {...this.props.slideOptions}
            />
          </div>
        );
        break;
      case "audio":
        output = (
          <div className="resource-slide-figure resource-slide-audio">
            <ResourceList.Slide.SlideAudio
              resource={resource}
              {...this.props.slideOptions}
            />
          </div>
        );
        break;
      default:
    }

    return output;
  };

  render() {
    return (
      <section className="resource-hero-container">
        <div className="resource-hero">
          {this.getFigureByType(this.props.resource)}
        </div>
      </section>
    );
  }
}
