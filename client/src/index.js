import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

/* * Utils * */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
/* * Components * */
import Nav from './components/Nav';
import SubmitAuction from './components/SubmitAuction';

/* * Containers * */
import AuctionPage from './containers/AuctionPage';
import BrowseAuctions from './containers/BrowseAuctions';
import MyAccount from './containers/MyAccount'
/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./dist/service-worker.js')
  .then(registration => console.log('Service worker registered.'))
  .catch(error => console.error('Error during service worker registration:', error));
} else {
  console.log('Service worker is not supported.');
}

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <Nav />
            <Switch>
              <Route path="/auction/:id" component={AuctionPage} />
              <Route path="/auction/" component={SubmitAuction} />
              <Route path="/myaccount" component={MyAccount} />
              <Route path="/" component={BrowseAuctions} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  </Provider>
  , document.getElementById('root'));


