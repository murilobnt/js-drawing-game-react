import React from 'react';

function VoteDrawings(props){
  const contents = [];
  props.content.forEach((subj, data) => {
    contents.push(
      <div>
      <h2>Players were prompted to draw a {subj}!</h2>
      <p>This is what they did:</p>
      <table style="width:100%">
        <tr>
          <td>{data[0].from}</td>
          <td>{data[1].from}</td>
        </tr>
        <tr>
          <td>{data[0].img}</td>
          <td>{data[1].img}</td>
        </tr>
      </table>
      <p>Cast your vote!</p>
      <button>a</button>
      <button>b</button>
      </div>
    )
  })
  return (
    <div>
    {() => contents.forEach((content) => content)}
    </div>
  );
}

export default VoteDrawings;
