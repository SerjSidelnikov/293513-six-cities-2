import React from 'react';
import PropTypes from 'prop-types';

import RentalCard from '../place-card/place-card';

function PlaceList(props) {
  const {rentalCardList, onRentalCardHover, onBookmarkClick} = props;

  return (
    <>
      {rentalCardList.map((offer) => (
        <RentalCard
          key={offer.id}
          offer={offer}
          onRentalCardHover={onRentalCardHover}
          onBookmarkClick={onBookmarkClick}
        />
      ))}
    </>
  );
}

PlaceList.propTypes = {
  rentalCardList: PropTypes.array.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default PlaceList;
