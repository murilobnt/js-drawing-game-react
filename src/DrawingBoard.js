import React from 'react';
import CanvasDraw from "react-canvas-draw"

function DrawingBoard(props){
  var canvas;
  return (
    <div>
      <h2>Draw a {props.subject}!</h2>
      <CanvasDraw ref={canvasDraw => (canvas = canvasDraw)} />
      <button onClick={() => {
        props.onSelect(canvas, props.subject);
      }}>
        Next!
      </button>
    </div>
  );
}

export default DrawingBoard;
