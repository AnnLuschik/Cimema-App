import { MovieSearchState } from './types';
import {
  SearchActionTypes, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, GET_MOVIES_REQUEST,
} from './actions';

const initialState: MovieSearchState = {
  responseData: null,
  errorMessage: null,
  loading: false,
};

export function movieSearchReducer(
  state = initialState,
  action: SearchActionTypes,
): MovieSearchState {
  switch (action.type) {
    case GET_MOVIES_SUCCESS: {
      return {
        ...state,
        responseData: action.payload,
        loading: false,
      };
    }

    case GET_MOVIES_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    }

    case GET_MOVIES_REQUEST: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    }

    default: return state;
  }
}
