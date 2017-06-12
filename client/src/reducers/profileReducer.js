
import { FETCH_PROFILE_AUCTIONS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE_AUCTIONS:
      return Object.assign({}, state, { auctions: action.payload.data });
    default:
      return state;
  }
}