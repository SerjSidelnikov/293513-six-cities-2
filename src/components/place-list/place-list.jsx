import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import RentalCard from '../place-card/place-card';

class PlaceList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {rentalCardList, onHeaderClick, onRentalCardHover} = this.props;

    return (
      <>
        {rentalCardList.map((offer) => (
          <RentalCard
            key={offer.id}
            offer={offer}
            onHeaderClick={onHeaderClick}
            onMouseEnter={this._handleMouseEnter}
            onMouseLeave={this._handleMouseLeave}
            onRentalCardHover={onRentalCardHover}
          />
        ))}
      </>
    );
  }

  _handleMouseEnter(offer) {
    this.setState({activeCard: offer});
  }

  _handleMouseLeave() {
    this.setState({activeCard: null});
  }
}

PlaceList.propTypes = {
  rentalCardList: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
};

export default PlaceList;
