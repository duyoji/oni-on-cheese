import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TopPage from '../containers/Top';
import GameListPage from '../containers/GameListPage';
import MapPage from '../containers/MapPage';
import Header from '../containers/Header'
import { addHandlerListener as addConnectHandlerListener } from '../socketHandlers/connect';
import { addHandlerListener as addReconnectHandlerListener } from '../socketHandlers/reconnect';
import InputUserNameModal from '../containers/modals/InputUserNameModal'

class App extends Component {
  componentDidMount() {
    addConnectHandlerListener( socket => this.props.connectedToSocket(socket.id) );
    addReconnectHandlerListener( socket => console.log('reconnect!!!', socket) );
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact={true} path="/" component={TopPage} />
        <Route exact={true} path="/game-list" component={GameListPage} />
        <Route exact={true} path="/map" component={MapPage} />
        <InputUserNameModal />
      </div>
    );
  }
}

App.propTypes = {
  connectedToSocket: PropTypes.func.isRequired,
};

export default App;
