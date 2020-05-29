import React from 'react';
import PropTypes from 'prop-types';

import RentalCard from '../place-card/place-card';

function PlaceList(props) {
  const {rentalCardList, onRentalCardHover, onBookmarkClick, pageClass, userEmail} = props;

  return (
    <>
      {rentalCardList.map((offer) => (
        <RentalCard
          key={offer.id}
          offer={offer}
          onRentalCardHover={onRentalCardHover}
          onBookmarkClick={onBookmarkClick}
          pageClass={pageClass}
          userEmail={userEmail}
        />
      ))}
    </>
  );
}

PlaceList.propTypes = {
  rentalCardList: PropTypes.array.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  pageClass: PropTypes.string.isRequired,
  userEmail: PropTypes.string
};

export default PlaceList;
