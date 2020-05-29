import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FavoriteItem from './favorite-item';
import {FavoriteOffer, CITIES} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoriteItem
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            favoriteOffers={[FavoriteOffer]}
            favoriteCity={CITIES[0]}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
