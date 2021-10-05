import { all, fork } from 'typed-redux-saga';

import { saga as getMarkersSaga } from './ducks/markers';

// import auth from './auth/sagas';
// import apartments from './apartments/sagas';
// import capabilities from './capabilities/sagas';
// import clients from './clients/sagas';
// import websocket from './websocket/sagas';

export default function* saga() {
  yield* all([
    getMarkersSaga(),
    // fork(auth),
    // fork(apartments),
    // fork(capabilities),
    // fork(clients),
    // fork(websocket),
  ]);
}
