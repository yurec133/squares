import React, { Component } from "react";
import style from "./ItemTable.module.css";
import ButtonItem from "./ItemTableBtn";
export default class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: Array.from(Array(this.props.initialWidth)).map((val, ind) => ind),
      columns: Array.from(Array(this.props.initialHeight)).map((val, ind) => ind),
      count: 100,
      left: 0,
      top: 0,
      positionX: 0,
      positionY: 0,
      active: false
    };
  }
  addRow = () => {
    this.setState(({ rows, count }) => {
      const newRow = [];
      newRow.push(this.state.count);
      const newArray = [...rows, newRow];
      return {
        rows: newArray,
        count: count + 1
      };
    });
  };
  addColumn = () => {
    this.setState(({ columns, count }) => {
      const newColumn = [];
      newColumn.push(this.state.count);
      const newArray = [...columns, newColumn];
      return {
        columns: newArray,
        count: count + 1
      };
    });
  };
  positionBtn = ({ target }, deleteCol) => {
    const counterPositionX = parseInt(target.getAttribute("data-current-td"));
    const counterPositionY = parseInt(target.getAttribute("data-current-tr"));
    this.setState(() => {
      return {
        positionX: counterPositionX,
        positionY: counterPositionY,
        active: true,
        left: counterPositionX * this.props.cellSize + counterPositionX * 3,
        top: counterPositionY * this.props.cellSize + counterPositionY * 3
      };
    });
    this.deleteColumn = () => {
      this.setState(({ columns, positionX, left }) => {
        const idx = columns.findIndex((el, index) => index === positionX);
        const newArray = [...columns.slice(0, idx), ...columns.slice(idx + 1)];
        return {
          positionX:
            columns.length - 1 === positionX ? positionX - 1 : positionX,
          columns: newArray,
          left:
            columns.length - 1 === positionX
              ? left - this.props.cellSize - 3
              : left
        };
      });
    };
    this.deleteRow = () => {
      this.setState(({ rows, positionY, top }) => {
        const idx = rows.findIndex((el, index) => index === positionY);
        const newArray = [...rows.slice(0, idx), ...rows.slice(idx + 1)];
        return {
          positionY: rows.length - 1 === positionY ? positionY - 1 : positionY,
          rows: newArray,
          top:
            rows.length - 1 === positionY ? top - this.props.cellSize - 3 : top
        };
      });
    };
  };
  positionBtnToggle = () => {
    this.setState(({ active }) => {
      return {
        active: false
      };
    });
  };
  render() {
    const { cellSize } = this.props;
    return (
      <div className={style.container}>
        <div
          style={{ padding: cellSize + 3 }}
          onMouseLeave={this.positionBtnToggle}
        >
          <div className={style.table_box}>
            <table>
              <tbody onMouseOver={this.positionBtn}>
                {this.state.rows.map((row, indexrow) => (
                  <tr key={row}>
                    {this.state.columns.map((column, indexcolumn) => (
                      <td
                        key={column}
                        style={{ height: cellSize, width: cellSize }}
                        data-current-td={indexcolumn}
                        data-current-tr={indexrow}
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <ButtonItem
              cellSize={cellSize}
              addRow={this.addRow}
              addColumn={this.addColumn}
              deleteColumn={this.deleteColumn}
              deleteRow={this.deleteRow}
              positionBtn={this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}
