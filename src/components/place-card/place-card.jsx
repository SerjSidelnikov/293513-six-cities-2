import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {OffersRestriction, OFFER_TYPES, ClassName, AppRoute} from "../../consts";

const PlaceCard = ({offer, onRentalCardHover, onBookmarkClick, pageClass, userEmail}) => {
  const {
    id,
    rentalTitle,
    rentalImages,
    rentalPrice,
    rentalRating,
    rentalType,
    isPremium,
    isBookmark,
    coordinates,
  } = offer;

  const ratingPercent = (Math.round(rentalRating) * 100) / OffersRestriction.MAX_RATING;

  return (
    <article
      className={`${
        pageClass === ClassName.CITY ? `${pageClass}__place-` : `${pageClass}__`
      }card place-card`}
      onMouseEnter={() => {
        onRentalCardHover([coordinates.latitude, coordinates.longitude]);
      }}
      onMouseLeave={() => {
        onRentalCardHover([]);
      }}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${pageClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={rentalImages[0]}
            width={pageClass === ClassName.FAVORITES ? `150` : `260`}
            height={pageClass === ClassName.FAVORITES ? `110` : `200`}
            alt="Place image"
          />
        </Link>
      </div>

      <div
        className={`${
          pageClass === ClassName.FAVORITES ? `${pageClass}__card-info` : ``
        } place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{rentalPrice}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {
            userEmail ? (
              <button
                className={`place-card__bookmark-button button ${
                  isBookmark ? `place-card__bookmark-button--active` : ``
                }`}
                type="button"
                onClick={() => {
                  onBookmarkClick(id, !isBookmark);
                }}
              >
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            ) : (
              <Link to={AppRoute.LOGIN}>
                <button
                  className={`place-card__bookmark-button ${isBookmark ? `place-card__bookmark-button--active` : ``} button`}
                  type="button"
                  onClick={() => {
                    onBookmarkClick(id, !isBookmark);
                  }}
                >
                  <svg className="place-card__bookmark-icon" width="18" height="19">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">In bookmarks</span>
                </button>
              </Link>
            )
          }
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{rentalTitle}</Link>
        </h2>
        <p className="place-card__type">{rentalType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rentalTitle: PropTypes.string.isRequired,
    rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rentalPrice: PropTypes.number.isRequired,
    rentalRating: PropTypes.number.isRequired,
    rentalType: PropTypes.oneOf(OFFER_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    isBookmark: PropTypes.bool.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  pageClass: PropTypes.string.isRequired,
  userEmail: PropTypes.string,
};

export default PlaceCard;
