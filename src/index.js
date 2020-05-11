import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app/app';

import offers from './moks/offers';

const init = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Router>
          <App
            rentalOffers={offers}
            rentalOfferCount={offers.length}
          />
        </Router>
      </React.StrictMode>,
      document.querySelector(`#root`)
  );
};

init();
