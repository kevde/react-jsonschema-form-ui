import React, { Component } from "react";
import { Form } from "react-bootstrap";

class ReactMultiSelectField extends Component {
  state = {};
  handleCheckBoxChange = (e) => {
    console.log("synt:", e);
  };
  render() {
    return (
      <>
        {" "}
        <div>sample multi select</div>
        <div className="multi_select_container">
          <div className="multi_select_header">
            <Form.Check type="checkbox" />
            <span className="total_items">11 items</span>
          </div>
          <div className="multi_select_body">
            {/* <select className="multi_select_ul" multiple>
              <option className="multi_select_list">
                <Form.Check type="checkbox" />
                <span>Sample1</span>
              </option>
            </select> */}
            <ul id="list" className="multi_select_ul">
              <li className="multi_select_list">
                <Form.Check
                  type="checkbox"
                  onChange={this.handleCheckBoxChange}
                />
                <span>Sample1</span>
              </li>
              <li className="multi_select_list">
                <Form.Check
                  type="checkbox"
                  onChange={this.handleCheckBoxChange}
                />
                <span>Sample1</span>
              </li>
            </ul>
          </div>
        </div>
        {/* <Form.Control id="multi-select" placeholder="sample" /> */}
      </>
    );
  }
}

export default ReactMultiSelectField;
