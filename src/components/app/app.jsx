import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from "../main/main";
import Property from '../property/property';
import {ActionCreator as AppActionCreator} from "../../reducers/app/app";
import {ActionCreator as DataActionCreator} from "../../reducers/data/data";
import {SortType} from "../../consts";
import {
  getActiveCardCoordinates,
  getCurrentCity,
  getCurrentSortType
} from "../../reducers/app/selector";
import {
  getAllOffers,
  getCities,
  getCurrentOffers,
  getIsError
} from "../../reducers/data/selector";

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
            isError={this.props.isError}
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
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  allOffers: getAllOffers(state),
  cities: getCities(state),
  currentCity: getCurrentCity(state),
  currentOffers: getCurrentOffers(state),
  currentSortType: getCurrentSortType(state),
  activeCardCoordinates: getActiveCardCoordinates(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(AppActionCreator.changeCity(city));
    dispatch(DataActionCreator.getOffers(city));
    dispatch(AppActionCreator.changeSortType(SortType.POPULAR));
  },
  onSortTypeClick(sortType) {
    dispatch(AppActionCreator.changeSortType(sortType));
  },
  onRentalCardHover(coordinates) {
    dispatch(AppActionCreator.setActiveCard(coordinates));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
