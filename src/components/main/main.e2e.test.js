import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';
import {OFFERS, CITIES} from "../../tests-mocks";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should change active cities by click`, () => {
  const activeCity = `Amsterdam`;
  const handleCityClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          cities={CITIES}
          currentCity={activeCity}
          currentOffers={OFFERS}
          onCityClick={handleCityClick}
          activeCardCoordinates={[]}
          currentSortType={`Popular`}
          onRentalCardHover={() => {}}
          onSortTypeClick={() => {}}
        />
      </MemoryRouter>
  );

  const cities = mainScreen.find(`.locations__item-link`);
  cities.at(0).simulate(`click`);

  expect(handleCityClick.mock.calls[0][0]).toBe(`Paris`);
  expect(handleCityClick.mock.calls[0][0]).not.toMatch(activeCity);
});
