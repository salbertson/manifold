import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class ResourceImportControlsImporting extends PureComponent {
  static displayName = "ResourceImport.Controls.Importing";

  static propTypes = {
    resourceImport: PropTypes.object.isRequired,
    refreshResults: PropTypes.func
  };

  render() {
    const resourceImport = this.props.resourceImport;
    if (!resourceImport) return null;

    return (
      <React.Fragment>
        <header className="form-section-label">
          <span>Step 4. Import Resources</span>
        </header>
        <p className="instructional-copy">
          The import is in progress. Each resource is updated in the background.
          This list below will refresh every 5 seconds, or you can press the
          refresh button to manually update the results.
        </p>

        <div
          className="buttons-icon-horizontal"
          style={{
            marginTop: 30,
            marginBottom: 0
          }}
        >
          <button
            onClick={this.props.refreshResults}
            className="button-icon-secondary"
          >
            <i className="manicon manicon-check small" aria-hidden="true" />
            <span>Refresh Results</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}
