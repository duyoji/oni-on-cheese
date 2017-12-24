import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopPage from '../containers/Top';
import GameListPage from '../containers/GameListPage';
import MapPage from '../containers/MapPage';
import Header from '../containers/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact={true} path="/" component={TopPage} />
        <Route exact={true} path="/game-list" component={GameListPage} />
        <Route exact={true} path="/map" component={MapPage} />
      </div>
    );
  }
}

export default App;
