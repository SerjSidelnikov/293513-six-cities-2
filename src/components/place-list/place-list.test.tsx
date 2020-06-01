import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import PlaceList from "./place-list";
import {OFFERS, doNothing} from "../../tests-mocks";
import {ClassName} from '../../consts';

const RENTAL_OFFER = OFFERS[0].offers;

it(`Should render OffersList correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PlaceList
            rentalCardList={RENTAL_OFFER}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            pageClass={ClassName.FAVORITES}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
