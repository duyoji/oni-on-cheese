import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Top from './Top';

class App extends Component {
  constructor(props){
    super(props);
  }

  get currentView(){
    if (this.props.currentView === 'Top'){
      return <Route exact={true} path="/" component={Top} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.currentView}
      </div>
    );
  }
}

export default App;
