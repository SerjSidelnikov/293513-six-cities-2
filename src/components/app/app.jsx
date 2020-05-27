import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from "../main/main";
import Property from '../property/property';
import {ActionCreator} from "../../reducers/reducer";
import {SortType} from "../../consts";

class App extends PureComponent {
  render() {
    const {cities, currentCity, currentOffers, onCityClick} = this.props;

    return (
      <Switch>
        <Route exact path="/">
          <Main
            cities={cities}
            currentCity={currentCity}
            currentOffers={currentOffers}
            onCityClick={onCityClick}
            currentSortType={this.props.currentSortType}
            onSortTypeClick={this.props.onSortTypeClick}
            onRentalCardHover={this.props.onRentalCardHover}
            activeCardCoordinates={this.props.activeCardCoordinates}
          />
        </Route>
        <Route exact path="/property/:id" render={
          ({match}) => this._renderPropertyScreen(match.params.id)}
        />
      </Switch>
    );
  }

  _renderPropertyScreen(id) {
    const offer = this.props.currentOffers[0].offers.find((property) => property.id === +id);

    return offer ? (
      <Property
        offer={offer}
        location={this.props.currentOffers[0].location}
        offers={this.props.currentOffers[0].offers}
        onRentalCardHover={this.props.onRentalCardHover}
        activeCardCoordinates={this.props.activeCardCoordinates}
      />
    ) : <Redirect to="/"/>;
  }
}

App.propTypes = {
  allOffers: PropTypes.array.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentOffers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  allOffers: state.allOffers,
  cities: state.cities,
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
  currentSortType: state.currentSortType,
  activeCardCoordinates: state.activeCardCoordinates,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(city));
    dispatch(ActionCreator.changeSortType(SortType.POPULAR));
  },
  onSortTypeClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onRentalCardHover(coordinates) {
    dispatch(ActionCreator.setActiveCard(coordinates));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
