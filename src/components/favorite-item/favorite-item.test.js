import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoriteItem from './favorite-item';
import {FAVORITE_OFFER} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoriteItem
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            favoriteOffers={[FAVORITE_OFFER]}
            favoriteCity={`Amsterdam`}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
