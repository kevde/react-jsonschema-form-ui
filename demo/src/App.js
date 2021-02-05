import React, { Component } from "react";
import Form from "../../src/forms/index";
import {
  ArrayFieldTemplate,
  CurrencyWidget,
  PercentWidget,
  RawHTMLField,
  ReactDatePickerWidget,
  ReactSelectWidget,
  ReactSignatureCanvasField,
  StatesWidget,
  ReactDropZoneWidget,
  ReactInputTableWidget,
  ReactPlaceField,
  ReactPlaceAutofillField,
  ReactPhotoGalleryField,
  ReactQRReaderField,
  ReactScannerField,
  ReactTreeSelectField,
} from "../../src/index";
import treeOptions from "./tree-options";
import "./App.css";

import { initListenerAutoResize } from "../../src/utils/helpers";

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactDropZoneWidget: ReactDropZoneWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget,
  ReactInputTableWidget: ReactInputTableWidget,
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactPlaceField: ReactPlaceField,
  ReactPlaceAutofillField: ReactPlaceAutofillField,
  ReactPhotoGalleryField: ReactPhotoGalleryField,
  ReactSignatureCanvasField: ReactSignatureCanvasField,
  ReactQRReaderField: ReactQRReaderField,
  ReactScannerField: ReactScannerField,
  ReactTreeSelectField: ReactTreeSelectField,
  ReactInputTableWidget: ReactInputTableWidget,
};

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  required: ["prepopulated_address"],
  // readOnly: true,
  properties: {
    textarea: {
      title: "Textarea auto resize content",
      type: "string",
    },
    test_react_select_without_enumNames: {
      title: "Test React Select (WITHOUT enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
    },
    test_react_select_with_enumNames: {
      title: "Test React Select (WITH enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
      enumNames: ["One", "Two", "Three"],
    },
    test_react_select_createable: {
      title: "Test React Select (createable)",
      type: "string",
      enum: ["1", "2", "3"],
    },
    test_react_select_array: {
      title: "Test React Select (ARRAY)",
      type: "array",
      items: {
        type: "string",
        enum: ["1", "2", "3"],
        enumNames: ["One", "Two", "Three"],
      },
      uniqueItems: true,
    },
    test_react_select_remote: {
      title: "Test React Select (Remote)",
      type: "array",
      items: {
        type: "string",
        enum: [],
      },
      uniqueItems: true,
    },
    currency: {
      title: "Currency Demo",
      type: "number",
    },
    percent: {
      title: "Percent",
      type: "number",
    },
    date: {
      title: "Date",
      type: "string",
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
            title: "String",
          },
          checkbox: {
            type: "boolean",
            title: "Checkbox",
          },
          select: {
            type: "string",
            enum: [],
            title: "Remote Select",
          },
        },
      },
    },
    us_states: {
      type: "string",
      title: "US States",
    },
    react_place_field: {
      type: "string",
      title: "Places",
    },
    signature: {
      type: "string",
      title: "Signer",
      format: "data-url",
    },
    raw_html: {
      type: "string",
      title: "Raw HTML",
    },
    react_photo_gallery: {
      title: "Photo Gallery",
      type: "object",
      required: ["attachments"],
      properties: {
        attachments: { type: "array" },
      },
    },
    react_qr_reader: {
      title: "QR Reader",
      type: "string",
    },
    react_scanner: {
      title: "Scanner",
      type: "string",
    },
    react_tree_select: {
      title: "Tree Select",
      type: "array",
      options: treeOptions,
    },
    prepopulated_address: {
      title: "Prepopulated Address",
      type: "object",
    },
    first_address: {
      title: "First Address (Prepopulated)",
      type: "string",
    },
    second_address: {
      title: "Second Address (Prepopulated)",
      type: "string",
    },
    city: {
      title: "City (Prepopulated)",
      type: "string",
    },
    state: {
      title: "State (Prepopulated)",
      type: "string",
    },
    country: {
      title: "Country (Prepopulated)",
      type: "string",
    },
    postcode: {
      title: "Postal Code (Prepopulated)",
      type: "string",
    },
    latitude: {
      title: "Latitude (Prepopulated)",
      type: "string",
    },
    longitude: {
      title: "Longitude (Prepopulated)",
      type: "string",
    },
    input_table: {
      title: "Input Table",
      type: "object",
      properties: {
        cleanliness: {
          type: "array",
          items: {
            type: "string",
          },
        },
        service_quality: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
};

const uiSchema = {
  textarea: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4,
    },
  },
  test_react_select_with_enumNames: {
    "ui:widget": "ReactSelectWidget",
  },
  test_react_select_without_enumNames: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isSearchable: true,
      isClearable: true,
      remote: {
        headers: {},
        paths: {},
      },
    },
  },
  test_react_select_createable: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isCreateable: true, //props
      isMulti: true,
    },
  },
  test_react_select_array: {
    "ui:widget": "ReactSelectWidget",
  },
  test_react_select_remote: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isMulti: true,
      remote: {
        url:
          "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
        headers: {
          Authorization: "Bearer keyKM5nPQi7efGQ9Z",
        },
        paths: {
          record: ["records"],
          value: ["id"],
          label: ["fields", "Name"],
        },
      },
    },
  },
  currency: {
    "ui:widget": "CurrencyWidget",
    "ui:options": {
      precision: 2,
    },
  },
  percent: {
    "ui:widget": "PercentWidget",
    "ui:options": {
      digits: 0,
    },
  },
  date: {
    "ui:widget": "ReactDatePickerWidget",
    "ui:options": {
      format: {
        data: "MM-DD-YYYY",
        display: "DD/MM/YYYY",
      },
    },
  },
  array_template: {
    items: {
      select: {
        "ui:widget": "ReactSelectWidget",
        "ui:options": {
          isMulti: false,
          remote: {
            url:
              "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
            headers: {
              Authorization: "Bearer keyKM5nPQi7efGQ9Z",
            },
            paths: {
              record: ["records"],
              value: ["id"],
              label: ["fields", "Name"],
            },
          },
        },
      },
    },
  },
  signature: {
    "ui:field": "ReactSignatureCanvasField",
    "ui:options": {
      width: 300,
      height: 100,
    },
  },
  us_states: {
    "ui:widget": "StatesWidget",
  },
  react_place_field: {
    "ui:field": "ReactPlaceField",
    "ui:options": {
      api: "AIzaSyDbrX2Eez6sb3gPBE-NIESdJfCHFrCUbCU",
    },
  },
  raw_html: {
    "ui:field": "RawHTMLField",
    "ui:options": { html: "<h1>Hi</h1>" },
  },
  react_photo_gallery: {
    "ui:field": "ReactPhotoGalleryField",
  },
  react_qr_reader: {
    "ui:field": "ReactQRReaderField",
  },
  react_scanner: {
    "ui:field": "ReactScannerField",
  },
  react_tree_select: {
    "ui:field": "ReactTreeSelectField",
  },
  prepopulated_address: {
    "ui:field": "ReactPlaceAutofillField",
    "ui:options": {
      api: "AIzaSyDbrX2Eez6sb3gPBE-NIESdJfCHFrCUbCU",
      showFields: true,
      updateAdjacentFields: true,
      fields: {
        address_1: "first_address",
        address_2: "second_address",
        city: "city",
        state: "state",
        postal_code: "postcode",
        country: "country",
      },
    },
  },
  input_table: {
    "ui:field": "ReactInputTableWidget",
    "ui:options": {
      inputTableType: "checkbox",
      rows: [
        "Service Quality",
        "Cleanliness",
        "Responsiveness",
        "Friendliness",
      ],
      columns: [
        "Not Satisfied",
        "Somewhat Satisfied",
        "Satisfied",
        "Very Satisfied",
      ],
    },
  },
};

const formData = {
  react_tree_select: ["parent"],
  input_table: {
    Cleanliness: ["Satisfied"],
    "Service Quality": ["Satisfied"],
    Responsiveness: ["Satisfied"],
    Friendliness: ["Satisfied"],
  },
};

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  componentDidMount() {
    initListenerAutoResize();
  }

  handleSubmit = (formData) => {
    alert(`submitted data is ${JSON.stringify(formData)}`);
    console.log("submitted", formData);
  };

  render() {
    return (
      <div className="App">
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <h2>Test Form</h2>
            <br />
            <Form
              formData={formData}
              schema={this.state.schema} //declaration of data types
              uiSchema={this.state.uiSchema}
              ArrayFieldTemplate={ArrayFieldTemplate}
              widgets={widgets}
              fields={fields}
              onChange={log("changed")}
              onSubmit={this.handleSubmit}
              onError={log("errors")}
            >
              <div>
                <button
                  type="submit"
                  className="btn btn-info"
                  disabled={this.state.schema.readOnly}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return <FormComponent schema={schema} uiSchema={uiSchema} />;
}

export default App;
