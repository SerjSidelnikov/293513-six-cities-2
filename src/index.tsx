import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app';
import reducer from './reducers/reducer';
import {createAPI} from "./api";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation} from "./reducers/user/user";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuthorization());

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.querySelector(`#root`)
);
