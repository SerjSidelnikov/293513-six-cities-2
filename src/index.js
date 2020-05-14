import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app';
import {reducer} from './reducers/reducer';

import offers from './mocks/offers';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App rentalOffers={offers} />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.querySelector(`#root`)
);
