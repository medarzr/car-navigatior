import { combineReducers } from 'redux';

import markersReducer from './ducks/markers';

const reducer = combineReducers({
  markersReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
