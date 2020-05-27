import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import OffersContainer from './offers-container.jsx';
import {OFFERS} from '../../tests-mocks';

it(`Should OffersContainer render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersContainer
            placesCount={OFFERS[0].offers.length}
            currentOffers={OFFERS}
            activeCardCoordinates={[]}
            currentSortType={`Popular`}
            onRentalCardHover={() => {}}
            onSortTypeClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
