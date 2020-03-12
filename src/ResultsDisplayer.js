import React from 'react';
import CanvasDraw from "react-canvas-draw"

function ResultsDisplayer(props){
  return (
    <div>
      <p>Drawing of a {props.subject}</p>
      <CanvasDraw
          style={{backgroundColor: "powderblue"}}
          disabled
          hideGrid
          canvasWidth = {100}
          canvasHeight = {100}
          saveData={localStorage.getItem(props.name)}
        />
    </div>
  );
}

export default ResultsDisplayer;
