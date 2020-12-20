import { MovieSearchState } from './types';
import {
  SearchActionTypes, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, GET_MOVIES_REQUEST,
  MoreSearchActionTypes, GET_MORE_MOVIES_SUCCESS, GET_MORE_MOVIES_FAILURE, GET_MORE_MOVIES_REQUEST,
} from './actions';

const initialState: MovieSearchState = {
  searchParams: { searchValue: '', searchType: '' },
  responseData: null,
  errorMessage: null,
  loading: false,
  loadingMore: false,
};

export function movieSearchReducer(
  state = initialState,
  action: SearchActionTypes | MoreSearchActionTypes,
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
        searchParams: action.payload,
        loading: true,
        errorMessage: null,
      };
    }

    case GET_MORE_MOVIES_SUCCESS: {
      return {
        ...state,
        loadingMore: false,
        responseData: {
          ...action.payload,
          data: state.responseData
            ? [...state.responseData.data || [], ...action.payload.data]
            : [],
        },
      };
    }

    case GET_MORE_MOVIES_FAILURE: {
      return {
        ...state,
        loadingMore: false,
        errorMessage: action.payload,
      };
    }

    case GET_MORE_MOVIES_REQUEST: {
      return {
        ...state,
        loadingMore: true,
      };
    }

    default: return state;
  }
}
