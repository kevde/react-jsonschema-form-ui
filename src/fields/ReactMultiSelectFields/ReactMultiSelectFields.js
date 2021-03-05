import React, { Component } from "react";
import { Form } from "react-bootstrap";
import CheckBox from "./checkbox";

class ReactMultiSelectField extends Component {
  state = {
    counter: 0,
    all: false,
  };

  handlerCounter = (isChecked) => {
    if (isChecked) {
      this.setState({ counter: this.state.counter + 1 });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  };

  handleCheckAll = (e) => {
    const { onChange } = this.props;
    var ele = document.getElementsByName("multiple_select_checkbox");
    var li = document.getElementsByClassName("multi_select_list");
    const active = document.getElementsByClassName("active");
    const selectedItems = [];

    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") {
        ele[i].checked = e.currentTarget.checked;
        ele[i].checked
          ? li[i].classList.add("active")
          : li[i].classList.remove("active");
      }
    }

    for (var i = 0; i < active.length; i++) {
      selectedItems.push(active[i].innerText);
    }

    onChange && onChange(selectedItems);

    this.setState({ counter: e.currentTarget.checked ? ele.length : 0 });
  };

  render() {
    return (
      <>
        <label>{this.props.schema.title}</label>
        <div className="multi_select_container">
          <div className="multi_select_header">
            <Form.Check type="checkbox" onChange={this.handleCheckAll} />
            <span className="total_items">{this.state.counter} items</span>
          </div>
          <div className="multi_select_body">
            <ul id="list" className="multi_select_ul">
              {this.props.uiSchema["ui:options"].items.map((item) => {
                return (
                  <CheckBox
                    name={item}
                    ctr={this.handlerCounter}
                    onChange={this.props.onChange}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default ReactMultiSelectField;
