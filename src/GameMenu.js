import React from 'react';

function GameMenu(props) {
  return (
    <div>
    <h2>Welcome!</h2>
    <p>First, specify your role</p>
    <button disabled = {props.disabled} onClick = { () => {return 'a';} }>Player</button>
    <button disabled = {props.disabled} onClick = { () => {return 'a';} }>Voter</button>
    </div>
  );
}

export default GameMenu;
