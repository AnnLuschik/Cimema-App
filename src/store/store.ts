import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootResucer';
import { movieSearchMiddleware } from '../Movie';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [movieSearchMiddleware],
});

// export const store: Store = createStore(rootReducer, applyMiddleware(movieSearchMiddleware));

// export const store = configureStore({
//   reducer: {
//     movie: movieSearchReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
// ReturnType,
// RootState,
// unknown,
// Action<string>
// >;
