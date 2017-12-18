import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/" component={TopPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/rooms" component={RoomsPage} />
          <Route exact={true} path="/map" component={MapPage} />
        </div>
      </Router>
    );
  }
}

const TopPage = () => (
  <Redirect to="/login"/>
  // <div>
  //   <p>Top Page</p>
  //   <Link to='/login'>
  //     <Button color="primary" size="lg" block>move to login page</Button>
  //   </Link>
  // </div>
);
const LoginPage = () => (
  <div>
    <p>Login Page</p>
    <Link to='/rooms'>
      <Button color="secondary" size="lg" block>move to rooms page</Button>
    </Link>
  </div>
);
const RoomsPage = () => (
  <div>
    <p>Rooms Page</p>
    <Link to='/map'>
      <Button color="success" size="lg" block>move to map page</Button>
    </Link>
  </div>
);
const MapPage = () => (
  <div>
    <p>Map Page</p>
    <Link to='/'>
      <Button color="warning" size="lg" block>move to top page</Button>
    </Link>
  </div>
);

export default App;
