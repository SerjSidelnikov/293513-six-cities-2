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
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onClick={() => {}}
            onMouseEnter={this._handleMouseEnter}
          />
        ))}
      </div>
    );
  }

  _handleMouseEnter(offer) {
    this.setState({activeCard: offer});
  }
}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default PlaceList;
