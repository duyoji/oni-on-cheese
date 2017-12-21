import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, withRouter, Redirect} from 'react-router-dom';

class Top extends Component {
  onClickNewGame(){
    this.props.createGame();
  }

  render() {
    if(this.props.roomId){
      return (
        <Redirect to='/map' />
      );
    } else {
      return (
        <div className='topPage'>
          <Button
            color="primary"
            size="lg"
            block
            onClick={()=>{this.onClickNewGame()}}
          >
          New Game
          </Button>
          <Link to='/games'>
            <Button
              color="secondary"
              size="lg"
              block
            >
            Join Game
            </Button>
          </Link>
        </div>
        
      );
    }
  }
}

export default withRouter(Top);