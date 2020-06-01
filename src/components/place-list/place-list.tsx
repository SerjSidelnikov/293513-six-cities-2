import * as React from 'react';

import RentalCard from '../place-card/place-card';
import {Coordinate, Offer} from "../../types";

interface Props {
  rentalCardList: Array<Offer>;
  onRentalCardHover: (coordinate: Coordinate) => void;
  onBookmarkClick: (id: number, status: boolean) => void;
  pageClass: string;
  userEmail?: string;
}

const PlaceList: React.FC<Props> = (props: Props) => {
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
};

export default PlaceList;
