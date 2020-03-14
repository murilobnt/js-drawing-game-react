import React, { useRef } from 'react';
import CanvasDraw from "react-canvas-draw"

function DrawingBoard(props){
  const canvasref = useRef(null);
  return (
    <div>
      <h2>Draw a {props.subject}!</h2>
      <CanvasDraw ref={canvasref} />
      <button onClick={() => {
          const img = canvasref.current.canvasContainer.children[1].toDataURL()
          canvasref.current.clear();
          props.onSelect(img)
        }
      }>
        Next!
      </button>
    </div>
  );
}

export default DrawingBoard;
