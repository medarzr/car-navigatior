import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: any[] = [sagaMiddleware];

if (__DEV__) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
