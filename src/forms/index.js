import _ from "lodash";
import React from "react";
import Form from "react-jsonschema-form";
class SchemaForm extends React.Component {
  form = React.createRef();

  render() {
    const formContext = { ...(this.props.formContext || {}) };
    return (
      <Form
        ref={(form) => {
          this.form.current = form;
        }}
        {...this.props}
        formContext={{ ...formContext, form: this.form }}
      />
    );
  }

  renderForm(props) {
    return <div>HI</div>;
  }
}

export default SchemaForm;
