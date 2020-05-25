import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './app.jsx';
import {OFFERS, ALL_OFFERS, CITIES} from "../../tests-mocks";

const initialState = {
  currentCity: CITIES[3],
  allOffers: ALL_OFFERS,
  currentOffers: OFFERS,
  cities: CITIES,
  currentSortType: `Popular`,
  activeCardCoordinates: [],
};

const reducer = (state = initialState) => {
  return state;
};

it(`Render App`, () => {
  const store = createStore(reducer);

  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <App
              allOffers={ALL_OFFERS}
              cities={CITIES}
              currentOffers={OFFERS}
              currentCity={CITIES[3]}
              onCityClick={() => {}}
              currentSortType={`Popular`}
              onSortTypeClick={() => {}}
              onRentalCardHover={() => {}}
              activeCardCoordinates={[]}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
