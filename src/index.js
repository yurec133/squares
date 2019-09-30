import React from "react";
import ReactDOM from "react-dom";
import ItemTable from "./ItemTable/ItemTable";

const AppTable = () => {
  return <ItemTable initialWidth={4} initialHeight={4} cellSize={50} />;
};

ReactDOM.render(<AppTable />, document.getElementById("root"));
