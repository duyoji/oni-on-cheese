import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, withRouter, Redirect} from 'react-router-dom';
import '../styles/top-page.css';

class TopPage extends Component {
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
        <div className="topPage container">
          <div className="buttonGroup">
            <Button
              className="topButton"
              color="primary"
              size="lg"
              block
              onClick={()=>{this.onClickNewGame()}}
            >
            New Game
            </Button>
            <Link to='/game-list'>
              <Button
                className="topButton"
                color="secondary"
                size="lg"
                block
              >
              Join Game
              </Button>
            </Link>
          </div>
        </div>

      );
    }
  }
}

export default withRouter(TopPage);