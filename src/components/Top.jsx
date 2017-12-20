import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter, Redirect} from 'react-router-dom';

class Top extends Component {
  constructor(props){
    super(props);
  }

  onClickNewGame(){
    this.props.createGame();
    this.props.history.push('/');
  }

  render() {
    if(this.props.roomId){
      return (
        <Redirect to ='/games' />
      );
    } else {
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
}

export default withRouter(Top);