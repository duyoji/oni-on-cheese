import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GameListPage from '../containers/GameListPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/game-list" component={GameListPage} />
      </div>
    );
  }
}

export default App;
