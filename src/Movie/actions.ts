import {
  IMoviesList, IMovieItem, ISearchParams,
} from './types';

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';

export const GET_MORE_MOVIES_REQUEST = 'GET_MORE_MOVIES_REQUEST';
export const GET_MORE_MOVIES_SUCCESS = 'GET_MORE_MOVIES_SUCCESS';
export const GET_MORE_MOVIES_FAILURE = 'GET_MORE_MOVIES_FAILURE';

export const GET_SINGLE_MOVIE_REQUEST = 'GET_SINGLE_MOVIE_REQUEST';
export const GET_SINGLE_MOVIE_SUCCESS = 'GET_SINGLE_MOVIE_SUCCESS';
export const GET_SINGLE_MOVIE_FAILURE = 'GET_SINGLE_MOVIE_FAILURE';
export const DELETE_SINGLE_MOVIE_DATA = 'DELETE_SINGLE_MOVIE_DATA';

interface GetMoviesRequestAction {
  type: typeof GET_MOVIES_REQUEST
  payload: ISearchParams
}

interface GetMoviesSuccessAction {
  type: typeof GET_MOVIES_SUCCESS
  payload: IMoviesList
}

interface GetMoviesFailureAction {
  type: typeof GET_MOVIES_FAILURE
  payload: string
}

export type SearchActionTypes = GetMoviesRequestAction
| GetMoviesSuccessAction
| GetMoviesFailureAction;

export function getMoviesRequest(query: ISearchParams): SearchActionTypes {
  return {
    type: GET_MOVIES_REQUEST,
    payload: query,
  };
}

export function getMoviesSuccess(data: IMoviesList): SearchActionTypes {
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

interface GetMoreMoviesRequestAction {
  type: typeof GET_MORE_MOVIES_REQUEST
}

interface GetMoreMoviesSuccessAction {
  type: typeof GET_MORE_MOVIES_SUCCESS
  payload: IMoviesList
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

export function getMoreMoviesSuccess(data: IMoviesList): MoreSearchActionTypes {
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

interface GetSingleMovieRequestAction {
  type: typeof GET_SINGLE_MOVIE_REQUEST
  payload: number
}

interface GetSingleMovieSuccessAction {
  type: typeof GET_SINGLE_MOVIE_SUCCESS
  payload: IMovieItem
}

interface GetSingleMovieFailureAction {
  type: typeof GET_SINGLE_MOVIE_FAILURE
  payload: string
}

interface DeleteSingleMovieDataAction {
  type: typeof DELETE_SINGLE_MOVIE_DATA
}

export type SingleSearchActionTypes = GetSingleMovieRequestAction
| GetSingleMovieSuccessAction
| GetSingleMovieFailureAction
| DeleteSingleMovieDataAction;

export function getSingleMovieRequest(id: number):SingleSearchActionTypes {
  return {
    type: GET_SINGLE_MOVIE_REQUEST,
    payload: id,
  };
}

export function getSingleMovieSuccess(data: IMovieItem):SingleSearchActionTypes {
  return {
    type: GET_SINGLE_MOVIE_SUCCESS,
    payload: data,
  };
}

export function getSingleMovieFailure(error: string):SingleSearchActionTypes {
  return {
    type: GET_SINGLE_MOVIE_FAILURE,
    payload: error,
  };
}

export function deleteSingleMovieData():SingleSearchActionTypes {
  return {
    type: DELETE_SINGLE_MOVIE_DATA,
  };
}
