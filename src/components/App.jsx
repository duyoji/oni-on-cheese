import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TopPage from '../containers/Top';
import GameListPage from '../containers/GameListPage';
import MapPage from '../containers/MapPage';
import Header from '../containers/Header'
import { addHandlerListener } from '../socketHandlers/connect';

class App extends Component {
  componentDidMount() {
    addHandlerListener( socket => this.props.connectedToSocket(socket.id) );
  }

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

App.propTypes = {
  connectedToSocket: PropTypes.func.isRequired,
};

export default App;
