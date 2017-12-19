import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Top from './Top';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Top} />
        {/* <Route exact={true} path="/login" component={LoginPage} /> */}
        <Route exact={true} path="/rooms" component={RoomsPage} />
        <Route exact={true} path="/map" component={MapPage} />
      </div>
    );
  }
}

// TODO: Replace TopPage Container
const TopPage = () => (
  <Redirect to="/login"/>
);

// TODO: Login Container
const LoginPage = () => (
  <div className="loginPage">
    <p>Login Page</p>
    <Link to='/rooms'>
      <Button color="secondary" size="lg" block>move to rooms page</Button>
    </Link>
  </div>
);

// TODO: RoomListPage Container
const RoomsPage = () => (
  <div className="roomsPage">
    <p>Rooms Page</p>
    <Link to='/map'>
      <Button color="success" size="lg" block>move to map page</Button>
    </Link>
  </div>
);

// TODO: MapPage Container
const MapPage = () => (
  <div className="mapPage">
    <p>Map Page</p>
    <Link to='/'>
      <Button color="warning" size="lg" block>move to top page</Button>
    </Link>
  </div>
);

export default App;
