import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/app/app';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducers/data/data';
import {AppRoute, SortType} from '../../consts';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Favorites from '../favorites/favorites.jsx';
import {
  getAllOffers,
  getCities,
  getCurrentOffers,
  getIsError,
  getFavorites,
} from '../../reducers/data/selector';
import {
  getActiveCardCoordinates,
  getCurrentCity,
  getCurrentSortType,
} from '../../reducers/app/selector';
import {Operation as UserOperation} from '../../reducers/user/user';
import {
  getAuthorizationStatus,
  getLoginStatus,
  getUserEmail,
} from '../../reducers/user/selectors';

const App = (props) => {
  const {
    allOffers,
    cities,
    currentOffers,
    currentCity,
    onCityClick,
    currentSortType,
    onSortTypeClick,
    onRentalCardHover,
    activeCardCoordinates,
    isError,
    onLogin,
    userEmail,
    isLoginError,
    authorizationStatus,
    onBookmarkClick,
    onUserEmailClick,
  } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            cities={cities}
            currentCity={currentCity}
            currentOffers={currentOffers}
            onCityClick={onCityClick}
            currentSortType={currentSortType}
            onSortTypeClick={onSortTypeClick}
            onRentalCardHover={onRentalCardHover}
            activeCardCoordinates={activeCardCoordinates}
            isError={isError}
            userEmail={userEmail}
            onBookmarkClick={onBookmarkClick}
            onUserEmailClick={onUserEmailClick}
          />
        </Route>
        <Route
          exact
          path={`${AppRoute.OFFER}/:id`}
          render={({match}) => {
            if (currentOffers.length === 0) {
              return null;
            }

            const offer = allOffers.find(
                (property) => property.offers[0].id === +match.params.id
            );

            if (!offer) {
              return <Redirect to={AppRoute.ROOT} />;
            }

            return (
              <Property
                offer={offer.offers[0]}
                location={offer.location}
                offers={currentOffers[0].offers}
                onRentalCardHover={onRentalCardHover}
                activeCardCoordinates={activeCardCoordinates}
                userEmail={userEmail}
              />
            );
          }}
        />
        <Route
          exact
          path={AppRoute.LOGIN}
          render={() => (
            <SignIn
              onSubmit={onLogin}
              isLoginError={isLoginError}
              userEmail={userEmail}
              onUserEmailClick={onUserEmailClick}
            />
          )}
        />
        <PrivateRoute
          authorizationStatus={authorizationStatus}
          render={() => (
            <Favorites
              onRentalCardHover={onRentalCardHover}
              userEmail={userEmail}
            />
          )}
          path={AppRoute.FAVORITES}
        />
        <Redirect to={AppRoute.ROOT} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  allOffers: PropTypes.array.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentOffers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
  isError: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  isLoginError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onUserEmailClick: PropTypes.func.isRequired,
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
  authorizationStatus: getAuthorizationStatus(state),
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(DataActionCreator.getOffers(city));
    dispatch(ActionCreator.changeSortType(SortType.POPULAR));
  },
  onSortTypeClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onRentalCardHover(coordinates) {
    dispatch(ActionCreator.setActiveCard(coordinates));
  },
  onLogin(userData) {
    dispatch(UserOperation.login(userData));
  },
  onBookmarkClick(id, status) {
    dispatch(DataOperation.changeFavoriteStatus(id, status));
  },
  onUserEmailClick() {
    dispatch(DataOperation.loadFavorites());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
