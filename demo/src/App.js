import React from 'react';
import Form from 'react-jsonschema-form';
import { ArrayFieldTemplate, CurrencyWidget, ReactDatePickerWidget, ReactSelectWidget } from '../../src/index';
import './App.css';

const widgets = {
  CurrencyWidget: CurrencyWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactSelectWidget: ReactSelectWidget
};

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  required: [],
  properties: {
    test_react_select_without_enumNames: {
      title: "Test React Select (WITHOUT enumNames)",
      type: "string",
      enum: ["1", "2", "3"]
    },
    test_react_select_with_enumNames: {
      title: "Test React Select (WITH enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
      enumNames: ["One", "Two", "Three"]
    },
    test_react_select_createable: {
      title: "Test React Select (createable)",
      type: "string",
      enum: ["1", "2", "3"]
    },
    test_react_select_array: {
      title: "Test React Select (ARRAY)",
      type: "array",
      items: {
        type: "string",
        enum: ["1", "2", "3"],
        enumNames: ["One", "Two", "Three"]
      },
      uniqueItems: true
    },
    currency: {
      title: "Currency Demo",
      type: "number"
    },
    date: {
      title: "Date",
      type: "string"
    },
    array_template: {
      type: "array",
      title: "Custom Array Template",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          string: {
            type: "string",
            title: "String"
          },
          checkbox: {
            type: "boolean",
            title: "Checkbox"
          }
        }
      }
    }
  }
};

const uiSchema = {
  test_react_select_with_enumNames:{
    "ui:widget": "ReactSelectWidget"
  },
  test_react_select_without_enumNames: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isSearchable": true,
      "isClearable": true
    }
  },
  test_react_select_createable: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isCreateable": true,
      "isMulti": true
    }
  },
  test_react_select_array: {
    "ui:widget": "ReactSelectWidget"
  },
  currency: {
    "ui:widget": "CurrencyWidget"
  },
  date: {
    "ui:widget": "ReactDatePickerWidget"
  }
};

function App() {
  return (
    <div className="App">
      <br /><br />
      <div className="row">
        <div className="col-md-4">
          <h2>Test Form</h2>
          <br />
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={{date: "2015-08-02T00:00:00.000Z"}}
            ArrayFieldTemplate={ArrayFieldTemplate}
            widgets={widgets}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
