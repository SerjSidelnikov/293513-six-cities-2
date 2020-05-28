import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from "../main/main";
import Property from '../property/property';
import SignIn from "../sign-in/sign-in";
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
import {Operation as UserOperation} from "../../reducers/user/user";
import {getLoginStatus, getUserEmail} from "../../reducers/user/selectors";

class App extends PureComponent {
  render() {
    const {
      cities,
      currentCity,
      currentOffers,
      onCityClick,
      isError,
      login,
      isLoginError,
      userEmail,
    } = this.props;

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
            isError={isError}
            userEmail={userEmail}
          />
        </Route>
        <Route exact path="/property/:id" render={
          ({match}) => this._renderPropertyScreen(match.params.id)}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <SignIn
              onSubmit={login}
              isLoginError={isLoginError}
              userEmail={userEmail}
            />
          )}
        />
      </Switch>
    );
  }

  _renderPropertyScreen(id) {
    if (this.props.currentOffers.length === 0) {
      return null;
    }

    const offer = this.props.currentOffers[0].offers.find((property) => property.id === +id);

    return offer ? (
      <Property
        offer={offer}
        location={this.props.currentOffers[0].location}
        offers={this.props.currentOffers[0].offers}
        onRentalCardHover={this.props.onRentalCardHover}
        activeCardCoordinates={this.props.activeCardCoordinates}
        userEmail={this.props.userEmail}
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
  login: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  isLoginError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  allOffers: getAllOffers(state),
  cities: getCities(state),
  currentCity: getCurrentCity(state),
  currentOffers: getCurrentOffers(state),
  currentSortType: getCurrentSortType(state),
  activeCardCoordinates: getActiveCardCoordinates(state),
  isError: getIsError(state),
  userEmail: getUserEmail(state),
  isLoginError: getLoginStatus(state),
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
  login(userData) {
    dispatch(UserOperation.login(userData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
