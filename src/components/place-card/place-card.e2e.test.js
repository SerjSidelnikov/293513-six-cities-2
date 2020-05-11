import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from "./place-card";
import {RentalFeature, RentalType} from '../../consts';

const RENTAL_OFFER = {
  offer: {
    id: 1,
    rentalHost: {
      hostName: `Angelina`,
      hostAvatar: `img/avatar-angelina.jpg`,
      isSuper: true,
    },
    rentalTitle: `Beautiful & luxurious apartment at great location`,
    rentalImages: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/apartment-small-03.jpg`,
      `img/apartment-small-04.jpg`,
    ],
    rentalPrice: 120,
    rentalRating: 5,
    rentalType: RentalType.APARTMENT,
    isPremium: true,
    isBookmark: true,
    rentalDescription: `A bright and charming apartment with 1 bedroom, located close to Museum Square in one of the most cosmopolitan and vibrant districts of Amsterdam "de PIJP". Perfect for short holidays, business trips.`,
    rentalRoomsQuantity: 3,
    rentalMaxGuestsQuantity: 3,
    rentalFeatures: [RentalFeature.DRYER, RentalFeature.WASHINGMACHINE],
  },
  onMouseLeave: () => {},
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should RentalCard handle onMouseEnter and click events`, () => {
  const onMouseEnter = jest.fn();
  const onHeaderClick = jest.fn();

  const rentalCard = shallow(
      <PlaceCard
        {...RENTAL_OFFER}
        onMouseEnter={onMouseEnter}
        onHeaderClick={onHeaderClick}
      />
  );

  const card = rentalCard.find(`.place-card`);
  const header = rentalCard.find(`.place-card__name`);

  card.simulate(`mouseenter`);
  header.simulate(`click`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
  expect(onHeaderClick).toHaveBeenCalledTimes(1);
});
