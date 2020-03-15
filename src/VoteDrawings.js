import React from 'react';

function VoteDrawings(props){
  const what = Object.keys(props.game_content).map((key) => {
    return (
      <div key={"div_" + key}>
      {key === '[object Object]' ? '' : <h2>Players were prompted to draw a {key}!</h2>}
      {key === '[object Object]' ? '' : <p>This is what they did:</p>}
      <table>
      <tbody>
      {props.game_content[key].map((data) => {
      return (
        <tr key={"tr_" + data.from + "_" + key}>
          <td><img src={data.img} width={100} /></td>
          <td><button key={"btn_" + data.from + "_" + key}
                      onClick={() => props.castVote(key, data.from)}
                      disabled={key in props.votes}>
              Vote this!
              </button></td>
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>
    )
  })

  return (
    <div>
      {what}
      <button onClick={props.onFinish}>Finish!</button>
    </div>
  );
}

export default VoteDrawings;
