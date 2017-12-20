import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Top from '../containers/Top';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Top} />
        <Route exact={true} path="/maps" component={MapPage} />
      </div>
    );
  }
}

// This is temporary component for map page
const MapPage = () => (
    <div className="mapPage">
      <p>Map Page</p>
      <Link to='/'>
        <Button color="warning" size="lg" block>move to top page</Button>
      </Link>
    </div>
  );

export default App;
