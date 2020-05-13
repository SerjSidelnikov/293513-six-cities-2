import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import PlaceList from "./place-list";
import {TEST_OFFERS} from "../../mocks/tests-mocks";

const RENTAL_OFFER = TEST_OFFERS[0].offers;

it(`Should render OffersList correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceList
            rentalCardList={RENTAL_OFFER}
            onHeaderClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
