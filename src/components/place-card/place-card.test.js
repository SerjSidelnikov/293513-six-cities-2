import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import PlaceCard from "./place-card";
import {TEST_OFFERS} from "../../mocks/tests-mocks";

const RENTAL_OFFER = TEST_OFFERS[0].offers[0];

it(`Should render RentalCard correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceCard
            offer={RENTAL_OFFER}
            onHeaderClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
