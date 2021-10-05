import { combineReducers } from 'redux';

import markers from './ducks/markers';

const reducer = combineReducers({
  markers,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
