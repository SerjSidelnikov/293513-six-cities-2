import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from './place-card';

import offers from '../../moks/offers';

describe(`<PlaceCard/>`, () => {
  it(`PlaceCard correctly renders after launch`, () => {
    const handleMouseEnter = jest.fn();
    const handleClick = jest.fn();

    const tree = renderer.create(
        <PlaceCard
          offer={offers[0]}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
