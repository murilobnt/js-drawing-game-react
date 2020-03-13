import React from 'react';

import DrawingBoard from './DrawingBoard'
import ResultsDisplayer from './ResultsDisplayer'
import GameMenu from './GameMenu'

class GameState extends React.Component {
  subjects = [
    {
      name : 'smiley face'
    },
    {
      name : 'house'
    }
  ]

  constructor(props){
    super(props);

    this.state = {
      game_state : 0,
      connected: false,
      subject_index : 0,
      drawing_datas : []
    }

    this.connect();

    this.connect = this.connect.bind(this)
  }

  renderResultsDisplayer(){
    return (
      <div>
      <h2>Results</h2>
      {this.state.drawing_datas.map(drawing => {
        return <ResultsDisplayer
          key = {drawing.name}
          subject = {drawing.subject}
          name = {drawing.name}
        />
      })}
      </div>
    );
  }

  connect(){
    let HOST = window.location.origin.replace(/^http/, 'ws').replace(/:3000/, ':30000')
    this.ws = new WebSocket(HOST);

    this.ws.onopen = () => {
      this.setState({connected : true});
    }
  }

  render(){
    let content;
    switch(this.state.game_state){
      case 0:
        content = <div>
                    <GameMenu disabled={!this.state.connected}/>
                    <button onClick = {this.connect}>Retry connection</button>
                  </div>;
        break;
      case 1:
        content =
          <DrawingBoard
          subject = {this.subjects[this.state.subject_index].name}
          onSelect = { (canvas, subject) => {
                        const name = 'drawing_' + this.state.subject_index;
                        localStorage.setItem(name, canvas.getSaveData());
                        canvas.clear();
                        this.setState({subject_index : this.state.subject_index + 1, drawing_datas : [...this.state.drawing_datas, {subject: subject, name: name}]})
                        }
                     }
        />
        break;
        default:
        content = <h1>erm</h1>
    }
    return(
      <div>
        {content}
      </div>
    );
  }
}

export default GameState;
