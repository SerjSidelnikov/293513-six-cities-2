import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from './place-card';

describe(`<PlaceCard/>`, () => {
  it(`PlaceCard correctly renders after launch`, () => {
    const tree = renderer.create(
        <PlaceCard offer={`Wood and stone place`}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
