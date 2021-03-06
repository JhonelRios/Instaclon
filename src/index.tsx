import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import App from './App';
import * as reducers from './ducks';
import services from './services';
import { loadUserInitialData } from './ducks/Users';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  applyMiddleware(thunk.withExtraArgument(services))
);

const loadInitialData = () => store.dispatch<any>(loadUserInitialData());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App loadInitialData={loadInitialData} history={history} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
