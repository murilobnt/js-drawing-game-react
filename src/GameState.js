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
      name : '',
      connected: false,
      subject_index : 0
    }

    this.connect = this.connect.bind(this)
    this.onJoinPlayers = this.onJoinPlayers.bind(this)
    this.onJoinVoters = this.onJoinVoters.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this)

    this.connect();
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

  handleReceivedMessage(message){
    const j_message = JSON.parse(message.data);
    switch(j_message.about){
      case 'op_return':
      break;
      case 'state':
      this.setState({game_state : j_message.state_id});
      break;
      case 'next_drawing':
      this.setState({subject_index : this.state.subject_index + 1});
      break;
    }
  }

  connect(){
    let HOST = window.location.origin.replace(/^http/, 'ws').replace(/:3000/, ':30000')
    this.ws = new WebSocket(HOST);

    this.ws.onopen = () => {
      this.setState({connected : true});
    }

    this.ws.onmessage = this.handleReceivedMessage
  }

  onJoinPlayers(){
    this.ws.send(JSON.stringify({action: 'join_players'}));
  }

  onJoinVoters(){
    this.ws.send(JSON.stringify({action: 'join_voters'}));
  }

  onNameChange(e){
    this.setState({name: e.target.value})
  }

  render(){
    let content;
    switch(this.state.game_state){
      case 0:
        content = <div>
                    <GameMenu disabled={!this.state.connected || this.state.name.length === 0}
                    onNameChange={this.onNameChange}
                    onJoinPlayers={this.onJoinPlayers}
                    onJoinVoters={this.onJoinVoters}
                    />
                    <button onClick = {this.connect}>Retry connection</button>
                  </div>;
        break;
      case 1:
        content =
          <DrawingBoard
          subject = {this.subjects[this.state.subject_index].name}
          onSelect = { (img) => {
                        const subject = this.subjects[this.state.subject_index].name;
                        this.ws.send(JSON.stringify({action: 'send_drawing', subject: subject, img:img}))
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
