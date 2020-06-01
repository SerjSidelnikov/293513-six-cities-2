import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FavoriteItem from './favorite-item';
import {FavoriteOffer, CITIES, doNothing} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoriteItem
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            favoriteOffers={[FavoriteOffer]}
            favoriteCity={CITIES[0]}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
