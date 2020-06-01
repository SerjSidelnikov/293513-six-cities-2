import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import PlaceCard from "./place-card";
import {OFFERS, doNothing} from "../../tests-mocks";
import {ClassName} from '../../consts';

const RENTAL_OFFER = OFFERS[0].offers[0];

it(`Should render RentalCard correctly with FAVORITES class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceCard
            offer={RENTAL_OFFER}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            pageClass={ClassName.FAVORITES}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with CITY class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceCard
            offer={RENTAL_OFFER}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            pageClass={ClassName.CITY}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with NEAR_PLACES class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceCard
            offer={RENTAL_OFFER}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            pageClass={ClassName.NEAR_PLACES}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
