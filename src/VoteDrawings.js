import React from 'react';

function VoteDrawings(props){
  const what = Object.keys(props.game_content).map((key) => {
    return (
      <div>
      <p>{key === '[object Object]' ? '' : key}</p>
      {props.game_content[key].map((data) => {
      return (
        <div>
          <p>{data.from} has drawn...</p>
          <img src={data.img} />
        </div>
      );
    })}
    </div>
    )
  })

  // props.content.forEach((subj, data) => {
  //   contents.push(
  //     <div>
  //     <h2>Players were prompted to draw a {subj}!</h2>
  //     <p>This is what they did:</p>
  //     <table style={{width: "100%"}}>
  //       <tr>
  //         <td>{data[0].from}</td>
  //         <td>{data[1].from}</td>
  //       </tr>
  //       <tr>
  //         <td>{data[0].img}</td>
  //         <td>{data[1].img}</td>
  //       </tr>
  //     </table>
  //     <p>Cast your vote!</p>
  //     <button>a</button>
  //     <button>b</button>
  //     </div>
  //   )
  // })
  return (
    <div>
    {what}
    </div>
  );
}

export default VoteDrawings;
