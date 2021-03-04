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
    var ele = document.getElementsByName("multiple_select_checkbox");
    var li = document.getElementsByClassName("multi_select_list");

    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") {
        ele[i].checked = e.currentTarget.checked;
        ele[i].checked
          ? li[i].classList.add("active")
          : li[i].classList.remove("active");
      }
    }

    this.setState({ counter: e.currentTarget.checked ? ele.length : 0 });
  };

  render() {
    return (
      <>
        <div>sample multi select</div>
        <div className="multi_select_container">
          <div className="multi_select_header">
            <Form.Check type="checkbox" onChange={this.handleCheckAll} />
            <span className="total_items">{this.state.counter} items</span>
          </div>
          <div className="multi_select_body">
            <ul id="list" className="multi_select_ul">
              <CheckBox name="sample1" ctr={this.handlerCounter} checked />
              <CheckBox name="sample2" ctr={this.handlerCounter} />
              <CheckBox name="sample3" ctr={this.handlerCounter} />
              <CheckBox name="sample4" ctr={this.handlerCounter} />
              <CheckBox name="sample5" ctr={this.handlerCounter} />
              <CheckBox name="sample6" ctr={this.handlerCounter} />
              <CheckBox name="sample7" ctr={this.handlerCounter} />
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default ReactMultiSelectField;
