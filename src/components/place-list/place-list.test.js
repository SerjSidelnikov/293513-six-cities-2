import React from 'react';
import renderer from 'react-test-renderer';

import PlaceList from './place-list';

import offers from '../../moks/offers';

describe(`<PlaceList/>`, () => {
  it(`PlaceList correctly renders after launch`, () => {
    const tree = renderer.create(
        <PlaceList offers={offers}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
