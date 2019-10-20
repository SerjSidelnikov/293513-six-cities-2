import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

const listOffers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

const init = () => {
  ReactDOM.render(
      <App
        offers={listOffers}
      />,
      document.querySelector(`#root`)
  );
};

init();
