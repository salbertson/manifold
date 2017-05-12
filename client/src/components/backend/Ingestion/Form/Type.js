import React, { PureComponent, PropTypes } from 'react';
import { Form } from 'components/backend';

export default class IngestionFormType extends PureComponent {

  static displayName = "ProjectDetail.Text.Ingestion.Form.Type";

  static PropTypes = {
    getModelValue: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static types = [
    {
      value: "epub",
      label: "EPUB v2 or v3"
    },
    {
      value: "word",
      label: "Word HTML Export"
    },
    {
      value: "markdown",
      label: "Markdown document(s)"
    },
    {
      value: "googledoc",
      label: "Google Doc"
    }
  ];

  get valid() {
    const value = this.props.getModelValue("attributes[ingestionType]");
    return this.ingestionTypeOptions.map((o) => o.value).includes(value);
  }

  get ingestionTypeOptions() {
    return IngestionFormType.types;
  }

  handleProceedClick = (event) => {
    event.preventDefault();
    this.props.history.push(this.props.location.pathname, { stage: "upload" });
  };

  render() {
    return (
      <Form.FieldGroup {...this.props} >
        <Form.Radios
          layout="vertical"
          name="attributes[ingestionType]"
          label="Text Format"
          options={this.ingestionTypeOptions}
        />
        <div style={{ marginTop: 30 }} className="buttons-icon-horizontal">
          <button
            onClick={this.close}
            className="button-icon-secondary dull"
          >
            <i className="manicon manicon-x small"></i>
            Cancel
          </button>
          <button
            onClick={this.handleProceedClick}
            className="button-icon-secondary"
            disabled={!this.valid}
          >
            <i className="manicon manicon-check small"></i>
            Continue
          </button>
        </div>
      </Form.FieldGroup>
    );
  }
}
