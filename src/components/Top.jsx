import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { createGame } from '../actions/index';

class Top extends Component {
  constructor(props){
    super(props);
    this.onClickNewGame = this.onClickNewGame.bind(this);
  }

  onClickNewGame(){
    createGame();
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