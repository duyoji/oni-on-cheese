import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Top from '../containers/Top';
import GameListPage from '../containers/GameListPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Top} />
        <Route exact={true} path="/game-list" component={GameListPage} />
        <Route exact={true} path="/map" component={MapPage} />
      </div>
    );
  }
}

// These are temporary component for map page
// I will delete them after merging Map
const MapPage = () => (
  <div className="mapPage">
    <p>Map Page</p>
    <Link to='/'>
      <Button color="warning" size="lg" block>move to top page</Button>
    </Link>
  </div>
);

const GameList = () => (
  <div className="roomsPage">
    <p>Rooms Page</p>
    <Link to='/map'>
      <Button color="success" size="lg" block>move to map page</Button>
    </Link>
  </div>
);

export default App;
