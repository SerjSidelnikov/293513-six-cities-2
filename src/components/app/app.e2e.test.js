import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from './app.jsx';
import Property from "../property/property";
import {OFFERS, ALL_OFFERS, CITIES} from "../../tests-mocks";
import {createAPI} from "../../api";
import {ActionType} from "../../reducers/data/data";

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    nearbyOffers: [],
    reviews: [],
    isError: false,
    isSending: false,
  },
  APP: {
    currentCity: CITIES[3],
    currentSortType: `Popular`,
    activeCardCoordinates: [],
  },
  USER: {
    authorizationStatus: `UNAUTHORIZED`,
    isLoginError: false,
    userEmail: ``,
  },
};

const expectedActions = [
  {type: ActionType.GET_REVIEWS},
  {type: ActionType.GET_NEARBY_OFFERS},
];

const store = mockStore(initialState, expectedActions);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should render Property component from App component`, () => {
  const app = mount(
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
            login={() => {}}
          />
        </Provider>
      </MemoryRouter>
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
