import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';

const listOffers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

describe(`<App/>`, () => {
  it(`App correctly renders first screen`, () => {
    const tree = renderer.create(
        <App offers={listOffers}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
