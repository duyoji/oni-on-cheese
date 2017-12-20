import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Top from '../containers/Top';

class App extends Component {
  constructor(props){
    super(props);
  }

//   render() {
//     return (
//       <div className="App">
// -        <Route exact={true} path="/" component={TopPage} />
// -        <Route exact={true} path="/login" component={LoginPage} />
// -        <Route exact={true} path="/rooms" component={RoomsPage} />
// -        <Route exact={true} path="/map" component={MapPage} />
// +        {this.currentView}
//       </div>
//     );

  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Top} />
      </div>
    );
  }
}

export default App;
