import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import OffersContainer from './offers-container';
import {OFFERS} from '../../tests-mocks';
import {ClassName, SortType} from '../../consts';

it(`Should OffersContainer render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersContainer
            placesCount={OFFERS[0].offers.length}
            currentOffers={OFFERS}
            activeCardCoordinates={[]}
            currentSortType={SortType.POPULAR}
            onRentalCardHover={() => {}}
            onSortTypeClick={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.CITY}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
