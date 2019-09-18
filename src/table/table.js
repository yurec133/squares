import React, {Component} from 'react';
import './table.css';
export default class ItemTable extends Component{
    constructor(props) {
        super(props);
        const {initialHeight, initialWidth} = this.props;
        const arrWidth = [];
        const arrHeight = [];
        for(let i=0; i < initialWidth; i++){
            arrWidth.push(i);
        }
        for(let i=0; i < initialHeight; i++){
            arrHeight.push(i);
        }
        this.state = {
            rows: arrWidth,
            cols: arrHeight
        };
    }
    addRow = () =>{
        const counter = Math.random();
        const newRow = [];
        newRow.push(counter);
        this.setState(({rows}) => {
            const newArry = [
                ...rows,
                newRow
            ]
            return({rows: newArry})
        });
    };
    addCell = () =>{
        const counter = Math.random();
        const newRow = [];
        newRow.push(counter);
        this.setState(({cols}) => {
            const newArry = [
                ...cols,
                newRow
            ]
            return({cols: newArry})
        });
    };
    deleteCell = () =>{
        this.setState(({cols}) => {
            const idx = cols.findIndex((el) => el);
            const newArry = [
                ...cols.slice(0, idx),
                ...cols.slice(idx + 1)
            ]
            return({cols: newArry})
        });
    };
    deleteRow = () =>{
        this.setState(({rows}) => {
            const idx = rows.findIndex((el) => el);
            const newArry = [
                ...rows.slice(0, idx),
                ...rows.slice(idx + 1)
            ]
            return({rows: newArry})
        });
    };
    render() {
        const {cellSize} = this.props;
        const styleBtn = {
            height: cellSize,
            width: cellSize
        }
        return(
            <div className="holder">
                <div className="table-box">
                    <table>
                        <tbody>
                        {this.state.rows.map((row) => (
                            <tr key={row.toString()}>
                                {this.state.cols.map((td) => (
                                    <td key={td.toString()} style={{height: cellSize, width: cellSize}}>
                                        <div className="btn-box top" style={{top: -cellSize - 5}}>
                                            <button onClick={this.deleteCell} type="button" style={styleBtn} className="btn btn-remove"><i className="fa fa-minus"></i></button>
                                        </div>
                                        <div className="btn-box left" style={{left: -cellSize - 5, marginTop: -cellSize/2}}>
                                            <button onClick={this.deleteRow} type="button" style={styleBtn} className="btn btn-remove"><i className="fa fa-minus"></i></button>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={this.addRow} type="button" style={styleBtn} className="btn btn-add"><i className="fa fa-plus"></i></button>
                </div>
                <div>
                    <button onClick={this.addCell} type="button" style={styleBtn} className="btn btn-add"><i className="fa fa-plus"></i></button>
                </div>
            </div>
        )
    }
}