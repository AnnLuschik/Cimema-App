import { MoviesList } from './types';

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';

interface GetMoviesRequestAction {
  type: typeof GET_MOVIES_REQUEST
  payload: {searchValue: string, searchType: string}
}

interface GetMoviesSuccessAction {
  type: typeof GET_MOVIES_SUCCESS
  payload: MoviesList
}

interface GetMoviesFailureAction {
  type: typeof GET_MOVIES_FAILURE
  payload: string
}

export type SearchActionTypes = GetMoviesRequestAction
| GetMoviesSuccessAction
| GetMoviesFailureAction;

export function getMoviesRequest(query: {
  searchValue: string, searchType: string}): SearchActionTypes {
  return {
    type: GET_MOVIES_REQUEST,
    payload: query,
  };
}

export function getMoviesSuccess(data: MoviesList): SearchActionTypes {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: data,
  };
}

export function getMoviesFailure(error: string): SearchActionTypes {
  return {
    type: GET_MOVIES_FAILURE,
    payload: error,
  };
}

export const GET_MORE_MOVIES_REQUEST = 'GET_MORE_MOVIES_REQUEST';
export const GET_MORE_MOVIES_SUCCESS = 'GET_MORE_MOVIES_SUCCESS';
export const GET_MORE_MOVIES_FAILURE = 'GET_MORE_MOVIES_FAILURE';

interface GetMoreMoviesRequestAction {
  type: typeof GET_MORE_MOVIES_REQUEST
}

interface GetMoreMoviesSuccessAction {
  type: typeof GET_MORE_MOVIES_SUCCESS
  payload: MoviesList
}

interface GetMoreMoviesFailureAction {
  type: typeof GET_MORE_MOVIES_FAILURE
  payload: string
}

export type MoreSearchActionTypes = GetMoreMoviesRequestAction
| GetMoreMoviesSuccessAction
| GetMoreMoviesFailureAction;

export function getMoreMoviesRequest(): MoreSearchActionTypes {
  return {
    type: GET_MORE_MOVIES_REQUEST,
  };
}

export function getMoreMoviesSuccess(data: MoviesList): MoreSearchActionTypes {
  return {
    type: GET_MORE_MOVIES_SUCCESS,
    payload: data,
  };
}

export function getMoreMoviesFailure(error: string): MoreSearchActionTypes {
  return {
    type: GET_MORE_MOVIES_FAILURE,
    payload: error,
  };
}

export const GET_SINGLE_MOVIE_REQUEST = 'GET_SINGLE_MOVIE_REQUEST';
export const GET_SINGLE_MOVIE_SUCCESS = 'GET_SINGLE_MOVIE_SUCCESS';
export const GET_SINGLE_MOVIE_FAILURE = 'GET_SINGLE_MOVIE_FAILURE';
