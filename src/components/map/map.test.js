import React from 'react';
import renderer from 'react-test-renderer';

import Map from "./map";

import offers from '../../moks/offers';

describe(`<Map/>`, () => {
  it(`Map correctly renders first screen`, () => {
    const points = offers.map((offer) => offer.pin);

    const tree = renderer.create(
        <Map points={points}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
