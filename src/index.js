import React from 'react';
import ReactDOM from 'react-dom';
import ItemTable from './table/table';


const AppTable = ()=>{
    return(
        <div className="container">
            <ItemTable initialWidth={4} initialHeight={4} cellSize={50}/>
        </div>
    )
}

ReactDOM.render(<AppTable/>, document.getElementById('root'));
