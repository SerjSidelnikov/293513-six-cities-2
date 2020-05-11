import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import PlaceCard from '../place-card/place-card';

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
    const {rentalCardList, onHeaderClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {rentalCardList.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onHeaderClick={onHeaderClick}
            onMouseEnter={this._handleMouseEnter}
            onMouseLeave={this._handleMouseLeave}
          />
        ))}
      </div>
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
  rentalCardList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

export default PlaceList;
