import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import OffersContainer from './offers-container.jsx';
import {TEST_OFFERS} from '../../tests-mocks';

it(`Should OffersContainer render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersContainer
            placesCount={TEST_OFFERS[0].offers.length}
            onHeaderClick={() => {}}
            currentOffers={TEST_OFFERS}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
