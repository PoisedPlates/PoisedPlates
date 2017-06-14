
import { FETCH_PROFILE_AUCTIONS, FETCH_PROFILE_BIDS} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE_AUCTIONS:
      return Object.assign({}, state, { auctions: action.payload.data });
    case FETCH_PROFILE_BIDS:
      return Object.assign({}, state, { bids: action.payload.data});
    default:
      return state;
  }
}