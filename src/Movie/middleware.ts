import { Middleware } from 'redux';
import { RootState } from './rootResucer';
import { GET_MOVIES_REQUEST, getMoviesSuccess, getMoviesFailure } from './actions';

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
