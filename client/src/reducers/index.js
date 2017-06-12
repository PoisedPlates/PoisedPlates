import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuctionsReducer from './reducer_auctions';
import biddingReducer from './biddingReducer';
import imagesReducer from './imagesReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auctions: AuctionsReducer,
  bidding: biddingReducer,
  images: imagesReducer,
  profile: profileReducer
});

export default rootReducer;
