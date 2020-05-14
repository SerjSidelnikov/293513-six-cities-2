import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import Main from './main.jsx';
import {TEST_OFFERS, TEST_CITIES} from "../../tests-mocks";

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main
            onHeaderClick={() => {}}
            cities={TEST_CITIES}
            currentCity={TEST_CITIES[3]}
            currentOffers={TEST_OFFERS}
            onCityClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
