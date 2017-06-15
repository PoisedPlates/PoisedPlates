import axios from "axios";

export const FETCH_AUCTIONS = 'fetch_auctions';
export const FETCH_AUCTION = 'fetch_auction';
export const POST_AUCTION = 'post_auction';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const FETCH_BID = 'FETCH_BID';
export const POST_BID = 'POST_BID';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const DESELECT_IMAGE = 'DESELECT_IMAGE';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const FETCH_PROFILE_AUCTIONS = 'FETCH_PROFILE_AUCTIONS';
export const FETCH_PROFILE_BIDS = 'FETCH_PROFILE_BIDS'
export const QUERY_ES = 'QUERY_ES';

export function fetchAuctions(categoryId) {
  const request = categoryId === 'all' ?
    axios.get('/api/auctions') :
    axios.get(`/api/category/${categoryId}`);

  return {
    type: FETCH_AUCTIONS,
    payload: request
  };
}


// Auction Actions:

export function postAuction(values, callback) {
  const request = axios.post('/api/auction', values)
    .then(() => callback());

  return {
    type: POST_AUCTION,
    payload: request
  };
}

export function fetchAuction(id) {
  const request = axios.get(`/api/auction/${id}`);

  return {
    type: FETCH_AUCTION,
    payload: request
  };
}

export function fetchAuctionByProfileId() {
  const request =  axios.get(`/api/profile/auctions`);
  return {
      type: FETCH_PROFILE_AUCTIONS,
      payload: request
    };
};

// Animation Actions:

export const toggleModal = () => ({ type: TOGGLE_MODAL });

// Images Actions:

export const selectImage = (display, file) => ({
  type: SELECT_IMAGE,
  payload: {
    display: display,
    file: file
  }
});

export const deselectImage = () => ({ type: DESELECT_IMAGE });


// Bidding Actions:

export const postBid = (id, bid) => {
  axios.post(`/api/auction/${id}`, { amt: bid });

  return {
    type: POST_BID,
    payload: bid
  };
};

export const fetchBid = (id) => (
  axios.get(`/api/auction/${id}/currentBid`)
    .then(data => {
      return {
        type: FETCH_BID,
        payload: data
      };
    })
);

export function fetchBidsByProfileId() {
  const request = axios.get('/api/profile/bids');
  return {
    type: FETCH_PROFILE_BIDS,
    payload: request
  };
};

// Search Actions:

export const queryES = (query) => {
  const request = axios.get(`http://search-testdomain-mqjsglxcm7vrowa4obce2iyque.us-west-1.es.amazonaws.com/_search?q=${query}`);

  return {
    type: QUERY_ES,
    payload: request
  }
}

// Category Actions:

export const fetchCategories = () => {
  const request = axios.get('/api/categories');

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
};

export const changeCategory = (id) => ({
  type: CHANGE_CATEGORY,
  payload: id
})



