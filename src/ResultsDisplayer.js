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
        size = '100%';
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

  return (
    <div>
    <h2>Results!</h2>
    {podium}
    </div>
  );
}

export default ResultsDisplayer;
