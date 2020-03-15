import React from 'react';

function GameMenu(props) {
  console.log('called')
  return (
    <div>
    <h2>Welcome!</h2>
    <p>Type in your username:</p>
    <input type='text' onChange={ props.onNameChange } />
    <p>First, specify your role</p>
    <button disabled = {props.disabled} onClick = { props.onJoinPlayers }>Player</button>
    <button disabled = {props.disabled} onClick = { props.onJoinVoters }>Voter</button>
    </div>
  );
}

export default GameMenu;
