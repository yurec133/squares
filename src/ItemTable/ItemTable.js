import React, { Component } from "react";
import style from "./ItemTable.module.css";
import ButtonItem from "./ItemTableBtn";
export default class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: Array.from(Array(this.props.initialWidth)).map((val, ind) => ind),
      cols: Array.from(Array(this.props.initialHeight)).map((val, ind) => ind),
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
  addCol = () => {
    this.setState(({ cols, count }) => {
      const newCol = [];
      newCol.push(this.state.count);
      const newArray = [...cols, newCol];
      return {
        cols: newArray,
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

    this.deleteCol = () => {
      this.setState(({ cols, positionX, left }) => {
        const idx = cols.findIndex((el, index) => index === positionX);
        const newArray = [...cols.slice(0, idx), ...cols.slice(idx + 1)];
        return {
          positionX: cols.length - 1 === positionX ? positionX - 1 : positionX,
          cols: newArray,
          left:
            cols.length - 1 === positionX
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
        active: !active
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
                    {this.state.cols.map((td, indextd) => (
                      <td
                        key={td}
                        style={{ height: cellSize, width: cellSize }}
                        data-current-td={indextd}
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
              addCol={this.addCol}
              deleteCol={this.deleteCol}
              deleteRow={this.deleteRow}
              positionBtn={this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}
