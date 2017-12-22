import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import TopPage from '../containers/Top';
import GameListPage from '../containers/GameListPage';
import MapPage from '../containers/MapPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={TopPage} />
        <Route exact={true} path="/game-list" component={GameListPage} />
        <Route exact={true} path="/map" component={MapPage} />
      </div>
    );
  }
}

export default App;
