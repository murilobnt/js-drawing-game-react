import React from 'react';

import DrawingBoard from './DrawingBoard'
import ResultsDisplayer from './ResultsDisplayer'

class DrawingPrompt extends React.Component {
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
      subject_index : 0,
      drawing_datas : []
    }
  }

  renderDrawingBoard(){
    return (
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
    );
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

  render(){
    const content = this.state.subject_index < this.subjects.length
    ?
      this.renderDrawingBoard()
    :
      this.renderResultsDisplayer()

    return(
      <div>
        {content}
      </div>
    );
  }
}

export default DrawingPrompt;
