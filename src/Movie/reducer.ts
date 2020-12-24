import { MovieSearchState } from './types';
import {
  SearchActionTypes, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, GET_MOVIES_REQUEST,
  MoreSearchActionTypes, GET_MORE_MOVIES_SUCCESS, GET_MORE_MOVIES_FAILURE, GET_MORE_MOVIES_REQUEST,
  GET_SINGLE_MOVIE_SUCCESS, GET_SINGLE_MOVIE_FAILURE, GET_SINGLE_MOVIE_REQUEST,
  SingleSearchActionTypes, DELETE_SINGLE_MOVIE_DATA,
} from './actions';

const initialState: MovieSearchState = {
  searchParams: { searchValue: '', searchType: '' },
  responseData: null,
  singleMovieData: null,
  errorMessage: null,
  loading: false,
  loadingMore: false,
  loadingModal: false,
};

export function movieSearchReducer(
  state = initialState,
  action: SearchActionTypes | MoreSearchActionTypes | SingleSearchActionTypes,
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

    case GET_SINGLE_MOVIE_SUCCESS: {
      return {
        ...state,
        loadingModal: false,
        singleMovieData: action.payload,
      };
    }

    case GET_SINGLE_MOVIE_FAILURE: {
      return {
        ...state,
        loadingModal: false,
        errorMessage: action.payload,
      };
    }

    case GET_SINGLE_MOVIE_REQUEST: {
      return {
        ...state,
        loadingModal: true,
      };
    }

    case DELETE_SINGLE_MOVIE_DATA: {
      return {
        ...state,
        singleMovieData: null,
      };
    }

    default: return state;
  }
}
