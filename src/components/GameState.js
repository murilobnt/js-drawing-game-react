import React from 'react';

import DrawingBoard from './DrawingBoard'
import ResultsDisplayer from './ResultsDisplayer'
import GameMenu from './GameMenu'
import VoteDrawings from './VoteDrawings'

import {connectToWS} from './../utils.js'

class GameState extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      game_state : 'menu',
      name : '',
      connected: false,
      subject_index : 0,
      game_content : {},
      votes : {},
      await_reason: '',
      subjects: []
    }

    this.cli_hash = Math.random().toString(36).substring(7);
    this.votes_on_player = {};
    this.results = {};

    this.onJoinPlayers = this.onJoinPlayers.bind(this)
    this.onJoinVoters = this.onJoinVoters.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
    this.castVote = this.castVote.bind(this)
    this.onFinishVoting = this.onFinishVoting.bind(this)
    this.resetClient = this.resetClient.bind(this)

    this.ws = connectToWS(window.location.origin.replace(/^http/, 'ws').replace(/:3000/, ':30000'),
                          () => {
                            this.setState({connected : true});
                          },
                          this.handleReceivedMessage)
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

  resetClient(){
    this.setState({
      game_state : 'menu',
      name : '',
      connected: false,
      subject_index : 0,
      game_content : {},
      votes : {},
      await_reason: '',
      subjects: []
    });

    this.votes_on_player = {};
    this.results = {};

    this.ws = connectToWS(window.location.origin.replace(/^http/, 'ws').replace(/:3000/, ':30000'),
                          () => {
                            this.setState({connected : true});
                          },
                          this.handleReceivedMessage)
  }

  handleReceivedMessage(message){
    const j_message = JSON.parse(message.data);
    switch(j_message.about){
      case 'abort_game':
        this.resetClient();
        alert(j_message.reason + ". Finishing the game...");
      break;
      case 'start_drawing':
        this.setState({game_state : 'drawing', subjects: j_message.subjects});
      break;
      case 'next_drawing':
      if(this.state.subject_index === this.state.subjects.length - 1){
        this.setState({game_state: 'waiting_screen', await_reason: 'Waiting for all voters to cast their votes.'})
        this.ws.send(JSON.stringify({action: 'ready_for_votes'}));
      } else {
        this.setState({subject_index : this.state.subject_index + 1});
        this.setState({game_state: 'drawing'});
      }
      break;
      case 'votes':
        j_message.player_names.forEach((player) => {
          this.votes_on_player[player] = 0;
        })
        this.setState({game_state : 'votes', game_content : j_message.content})
      break;
      case 'end_game':
        this.results = j_message.result;
        this.setState({game_state: 'results'})
      break;
      default:
      break;
    }
  }

  onJoinPlayers(){
    this.setState({game_state: 'waiting_screen', await_reason: 'Waiting more players.'})
    this.ws.send(JSON.stringify({action: 'join_players', name: this.state.name, cli_hash: this.cli_hash}));
  }

  onJoinVoters(){
    this.setState({game_state: 'waiting_screen', await_reason: 'Waiting for players to finish their drawings.'})
    this.ws.send(JSON.stringify({action: 'join_voters'}));
  }

  onNameChange(e){
    this.setState({name: e.target.value})
  }

  castVote(subject, player_name){
    let local_votes = this.state.votes;
    local_votes[subject] = player_name;

    this.votes_on_player[player_name] = this.votes_on_player[player_name] + 1;

    this.setState({votes: local_votes});
  }

  onFinishVoting(){
    this.setState({game_state: 'waiting_screen', await_reason: 'Waiting for all voters to cast their votes.'})
    this.ws.send(JSON.stringify({action: 'end_votes', votes: this.votes_on_player}));
  }

  render(){
    let content;
    switch(this.state.game_state){
      case 'menu':
        content = <div>
                    <GameMenu p_disabled={!this.state.connected || this.state.name.length === 0}
                    v_disabled={!this.state.connected}
                    onNameChange={this.onNameChange}
                    onJoinPlayers={this.onJoinPlayers}
                    onJoinVoters={this.onJoinVoters}
                    />
                    <button onClick = {this.connect}>Retry connection</button>
                  </div>;
        break;
      case 'drawing':
        content =
          <DrawingBoard
          subject = {this.state.subjects[this.state.subject_index]}
          onSelect = { (img) => {
                        const subject = this.state.subjects[this.state.subject_index];
                        this.ws.send(JSON.stringify({action: 'send_drawing', subject: subject, img:img, cli_hash: this.cli_hash}))
                        this.setState({game_state: 'waiting_screen', await_reason: 'Waiting for all drawers to finish.'})
                        }
                     }
        />
        break;
      case 'results':
        content = <ResultsDisplayer results={this.results} resetClient={this.resetClient}/>
      break;
      case 'votes':
        content = <VoteDrawings
                    game_content={this.state.game_content}
                    votes={this.state.votes}
                    castVote={this.castVote}
                    onFinish={this.onFinishVoting}
                    />
      break;
      case 'waiting_screen':
        content = <div>
                  <h2>Please wait...</h2>
                  <p>{this.state.await_reason}</p>
                  </div>
      break;
      default:
        content = <h1>I am error</h1>
      break;
    }
    return(
      <div>
        {content}
      </div>
    );
  }
}

export default GameState;
