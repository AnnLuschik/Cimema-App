import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootResucer';
import {
  movieSearchMiddleware,
  moreMovieSearchMiddleware,
  singleSearchMiddleware,
} from '../Movie';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [movieSearchMiddleware, moreMovieSearchMiddleware, singleSearchMiddleware],
});
