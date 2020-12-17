import { combineReducers } from 'redux';
import { movieSearchReducer } from '../Movie';

export const rootReducer = combineReducers({
  movie: movieSearchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
