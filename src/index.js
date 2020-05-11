import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app/app';

import offers from './mocks/offers';

const init = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Router>
          <App rentalOffers={offers} />
        </Router>
      </React.StrictMode>,
      document.querySelector(`#root`)
  );
};

init();
