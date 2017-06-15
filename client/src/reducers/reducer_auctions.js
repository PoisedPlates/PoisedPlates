import _ from 'lodash';
import { FETCH_AUCTIONS, FETCH_AUCTION, QUERY_ES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case QUERY_ES:
      let queryResults = {};
      action.payload.data.hits.hits.map( auction => {
        const {_source} = auction;
        queryResults[_source.auction_id] = {
          id: _source.auction_id,
          category: { id: _source.category_id, name: _source.name },
          categpry_id: _source.category_id,
          description: _source.description,
          end_time: _source.end_time,
          images: [ { auction_id: _source.auction_id, url: _source.url} ],
          title: _source.title,
          location: { city: _source.city, id: _source.location_id, state: _source.state}
        }
      })
      return queryResults;
    case FETCH_AUCTION:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_AUCTIONS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

