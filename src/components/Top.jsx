import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Top extends Component {
  constructor(props){
    super(props);
  }

  onClickNewGame(){
    this.props.createNewGame();
  }

  render() {
    return (
      <Button
        color="primary"
        size="lg"
        block
        onClick={()=>{this.onClickNewGame}}
      >
      New Game
      </Button>
    );
  }
}

export default Top;