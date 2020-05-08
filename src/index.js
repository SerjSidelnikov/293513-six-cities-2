import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

import offers from './moks/offers';

const init = () => {
  ReactDOM.render(
      <React.StrictMode>
        <App
          offers={offers}
        />
      </React.StrictMode>,
      document.querySelector(`#root`)
  );
};

init();
