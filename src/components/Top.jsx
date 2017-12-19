import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { createGame } from '../actions/index';

class Top extends Component {
  constructor(props){
    super(props);
  }

  onClickNewGame(){
    console.log(this.props)
    this.props.createGame();
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          size="lg"
          block
          onClick={()=>{this.onClickNewGame()}}
        >
        New Game
        </Button>
      </div>
    );
  }
}

export default Top;