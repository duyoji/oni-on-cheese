import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GameListPage from '../containers/GameListPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/game-list" component={GameListPage} />
        <Route exact={true} path="/map" component={MapPage} />
      </div>
    );
  }
}

// I will delete this component after creating Map component/container.
const MapPage = () => (
  <div>
    <h2>Map Page</h2>
  </div>
);


export default App;
