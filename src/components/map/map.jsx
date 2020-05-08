import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.city = [52.38333, 4.9];
    this.zoomMap = 12;

    this.mapConfig = {
      center: this.city,
      zoom: this.zoomMap,
      zoomControl: false,
      marker: true,
    };

    this.iconConfig = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    this.mapRef = React.createRef();
    this.map = null;
  }

  componentDidMount() {
    const {points} = this.props;

    if (this.mapRef.current) {
      this.map = leaflet.map(this.mapRef.current, this.mapConfig);
      this.map.setView(this.city, this.zoomMap);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      points.map((it) => {
        leaflet
          .marker(it, this.iconConfig)
          .addTo(this.map);
      });
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <section ref={this.mapRef} className="cities__map map"/>
    );
  }
}

Map.propTypes = {
  points: PropTypes.arrayOf(
      PropTypes.arrayOf(
          PropTypes.number.isRequired
      ).isRequired
  ).isRequired
};

export default Map;
