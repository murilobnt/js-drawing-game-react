import React from 'react';

function GameMenu(props) {
  return (
    <div>
    <h2>Welcome!</h2>
    <p>Type in your username:</p>
    <input type='text' onChange={ props.onNameChange } />
    <p>First, specify your role</p>
    <button disabled = {props.p_disabled} onClick = { props.onJoinPlayers }>Player</button>
    <button disabled = {props.v_disabled} onClick = { props.onJoinVoters }>Voter</button>
    </div>
  );
}

export default GameMenu;
