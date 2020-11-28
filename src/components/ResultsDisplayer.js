import React from 'react';

function ResultsDisplayer(props){
  let items = Object.keys(props.results).map(function(key) {
    return [key, props.results[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  const podium = items.slice(0, 3).map((who, index) => {
    let size;
    let prefix;

    switch(index){
      case 0:
        prefix = '1st';
        size = '200%';
        break;
      case 1:
        prefix = '2nd'
        size = '150%';
        break;
      case 2:
        prefix = '3rd';
        size = '125%';
        break;
      default:
        break;
    }
    return(
      <div>
      <p style={{fontSize: size}}>In the {prefix} place: {who[0]}, with {who[1]} vote(s)!</p>
      </div>
    )
  });

  const other_players = items.slice(3).map((who) => {
    return(
      <div>
        <p>{who[0]}: {who[1]} vote(s).</p>
      </div>
    )
  })

  return (
    <div>
    <h2>Results!</h2>
    <h3>Podium</h3>
    {podium}
    <h3>The others</h3>
    {other_players}
    <button onClick={props.resetClient}>Main Menu</button>
    </div>
  );
}

export default ResultsDisplayer;
