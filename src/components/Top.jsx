import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Top extends Component {
  constructor(props){
    super(props);
  }

  onClickNewGame(){
    this.props.createGame();
    this.props.history.push('/');
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