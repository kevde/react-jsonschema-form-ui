import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { classNames } from "classnames";

class CheckBox extends Component {
  state = {};

  handleCheckBoxChange = (e) => {
    const { ctr, name } = this.props;

    const li = document.getElementById(name);
    const input = document.getElementById(`check-box-${name}`);

    input.checked ? li.classList.add("active") : li.classList.remove("active");

    ctr(e.currentTarget.checked);
  };

  render() {
    const { name, isCheckAll } = this.props;

    return (
      <>
        <li id={name} key={name} className={`multi_select_list`}>
          <Form.Check
            id={`check-box-${name}`}
            type="checkbox"
            name="multiple_select_checkbox"
            onChange={this.handleCheckBoxChange}
          />
          <span>{name}</span>
        </li>
      </>
    );
  }
}

export default CheckBox;
