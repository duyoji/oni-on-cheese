import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import App from './containers/App'; // eslint-disable-line no-unused-vars
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

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