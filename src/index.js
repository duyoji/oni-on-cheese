import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(reducer);

// In order to make Router test easy,
// Separating <Router /> and <Route />.
// See: src/__tests__/components/App.js
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();