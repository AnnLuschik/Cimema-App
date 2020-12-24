import { Middleware } from 'redux';
import type { RootState } from '../store';
import {
  GET_MOVIES_REQUEST, getMoviesSuccess, getMoviesFailure,
  GET_MORE_MOVIES_REQUEST, getMoreMoviesSuccess, getMoreMoviesFailure,
  GET_SINGLE_MOVIE_REQUEST,
  getSingleMovieSuccess,
  getSingleMovieFailure,
} from './actions';

export const movieSearchMiddleware: Middleware<
unknown,
RootState
> = (store) => (next) => (action) => {
  if (action.type === GET_MOVIES_REQUEST) {
    fetch(`https://reactjs-cdp.herokuapp.com/movies?search=${action.payload.searchValue}&searchBy=${action.payload.searchType}`)
      .then((res) => res.json())
      .then((result) => store.dispatch(getMoviesSuccess(result)))
      .catch((error) => store.dispatch(getMoviesFailure(error)));
  }
  next(action);
};

export const moreMovieSearchMiddleware: Middleware<
unknown,
RootState
> = (store) => (next) => (action) => {
  const { movie: { responseData, searchParams } } = store.getState();

  if (responseData) {
    const { offset, limit } = responseData;
    const { searchValue, searchType } = searchParams;

    if (action.type === GET_MORE_MOVIES_REQUEST) {
      fetch(`https://reactjs-cdp.herokuapp.com/movies?search=${searchValue}&searchBy=${searchType}&offset=${offset + limit}`)
        .then((res) => res.json())
        .then((result) => store.dispatch(getMoreMoviesSuccess(result)))
        .catch((error) => store.dispatch(getMoreMoviesFailure(error)));
    }
  }
  next(action);
};

export const singleSearchMiddleware: Middleware<
unknown,
RootState
> = (store) => (next) => (action) => {
  if (action.type === GET_SINGLE_MOVIE_REQUEST) {
    fetch(`https://reactjs-cdp.herokuapp.com/movies/${action.payload}`)
      .then((res) => res.json())
      .then((result) => store.dispatch(getSingleMovieSuccess(result)))
      .catch((error) => store.dispatch(getSingleMovieFailure(error)));
  }
  next(action);
};
