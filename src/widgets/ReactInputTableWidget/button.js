import React from "react";
import _ from "lodash";
import { Table, Button } from "react-bootstrap";

class ButtonInputTable extends React.Component {
  state = {
    checkbox: true,
  };

  handleGridReady = (params) => {
    console.log("params", params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  handleButtonClick = (currentValue) => {
    const { onChange } = this.props;
    return () => {
      onChange && onChange(currentValue);
    };
  };

  isCellValueChecked = (rowData, colData) => {
    const formData = this.props.formData;
    return `${rowData} - ${colData}` === formData;
  }

  renderCell(rowData, colData) {
    const isSelected = this.isCellValueChecked(rowData, colData);
    const currentValue = `${rowData} - ${colData}`;
    return (
      <Button
        variant={isSelected ? "secondary" : "outlined"}
        active={isSelected}
        onClick={this.handleButtonClick(currentValue)}
      >{currentValue}</Button>
    )
  }

  render() {
    const { rows, columns } = _.get(this.props, 'uiSchema.ui:options', {});
    return (
      <Table responsive>
        <tbody>
          {_.map(rows, (rowData) => (
            <tr>
              {_.map(columns, (colData, colIndex) => (
                <td key={colIndex}>
                  {this.renderCell(rowData, colData)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default ButtonInputTable;