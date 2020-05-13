import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const {
      location: {cityCoordinates},
    } = this.props;

    if (this._mapRef.current) {
      const zoom = 12;

      this.map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom,
        zoomControl: false,
        marker: true,
      });
      this.map.setView(cityCoordinates, zoom);

      leaflet
        .tileLayer(
            `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
            {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
            }
        )
        .addTo(this.map);

      this._getMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.offersCoordinates !== prevProps.offersCoordinates) {
      this._getMap();
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <div style={{height: `100%`}} ref={this._mapRef} />
    );
  }

  _getIcon(isActive) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [27, 39],
    });
  }

  _getMap() {
    if (this.markersGroup) {
      this.markersGroup.removeLayer(this._mapRef.current);
    }

    this.markersGroup = leaflet.layerGroup().addTo(this.map);

    this.props.offersCoordinates.forEach((coordinates) => {
      leaflet
        .marker(coordinates, {
          icon: this._getIcon(
              coordinates[0] === this.props.activeCoordinates[0] &&
              coordinates[1] === this.props.activeCoordinates[1]
          ),
        })
        .addTo(this.markersGroup);
    });
  }
}

Map.defaultProps = {
  activeCoordinates: [],
};

Map.propTypes = {
  location: PropTypes.shape({
    cityCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  offersCoordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  activeCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
};

export default Map;
