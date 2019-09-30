import React from "react";
import style from "./ItemTable.module.css";
const ButtonItem = (props)=>{
    const { cellSize, addRow, addCol, deleteCol, deleteRow, positionBtn} = props;
    const styleBtn = {
      positionTop: {
        height: cellSize,
        width: cellSize,
        top: -cellSize - 2,
        left: positionBtn.left + 5,
        visibility:
          positionBtn.cols.length === 1
            ? "hidden"
            : positionBtn.active
            ? "visible"
            : "hidden"
      },
      positionBottom: {
        height: cellSize,
        width: cellSize,
        bottom: -cellSize - 2,
        left: 5
      },
      positionRight: {
        height: cellSize,
        width: cellSize,
        top: 5,
        right: -cellSize - 2
      },
      positionLeft: {
        height: cellSize,
        width: cellSize,
        left: -cellSize - 2,
        top: positionBtn.top + 5,
        visibility:
          positionBtn.rows.length === 1
            ? "hidden"
            : positionBtn.active
            ? "visible"
            : "hidden"
      }
    };
    return(
        <React.Fragment>
            <button
                onClick={addRow}
                type="button"
                style={styleBtn.positionBottom}
                className={`${style.btn} ${style.btn_add}`}
            >
                <i className="fa fa-plus"></i>
            </button>
            <button
                onClick={addCol}
                type="button"
                style={styleBtn.positionRight}
                className={`${style.btn} ${style.btn_add}`}
            >
                <i className="fa fa-plus"></i>
            </button>
            <button
                onClick={deleteCol}
                type="button"
                style={styleBtn.positionTop}
                className={`${style.btn} ${style.btn_remove}`}
            >
                <i className="fa fa-minus"></i>
            </button>
            <button
                onClick={deleteRow}
                type="button"
                style={styleBtn.positionLeft}
                className={`${style.btn} ${style.btn_remove}`}
            >
                <i className="fa fa-minus"></i>
            </button>
        </React.Fragment>
    )
}
export default ButtonItem;