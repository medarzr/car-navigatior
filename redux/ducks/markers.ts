import { takeLatest, put, all, delay } from 'typed-redux-saga';
import { MarkersState } from './types';

export const prefix = 'markers/';

/**
 * Constants
 * */
export const GET_MARKERS_REQUEST = `${prefix}GET_MARKERS_REQUEST` as const;
export const GET_MARKERS_START = `${prefix}GET_MARKERS_START` as const;
export const GET_MARKERS_SUCCESS = `${prefix}GET_MARKERS_SUCCESS` as const;
export const GET_MARKERS_ERROR = `${prefix}GET_MARKERS_ERROR` as const;

/**
 * Reducer
 * */
export const initialState: MarkersState = {
  markers: null,
  loading: false,
};

export default function markers(state = initialState, action): MarkersState {
  switch (action.type) {
    case GET_MARKERS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_MARKERS_SUCCESS:
    case GET_MARKERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
}

/**
 * Selectors
 * */
// export const markersSelector = (state) => state[prefix].markers;
// export const loadingSelector = (state) => state[prefix].loading;
export const markersSelector = (state) => state.markers.markers;
export const loadingSelector = (state) => state.markers.loading;


/**
 * Action Creators
 * */
export type GetMarkers = {
  type: typeof GET_MARKERS_REQUEST;
};

export const getMarkers = (): GetMarkers => ({
  type: GET_MARKERS_REQUEST,
});


export const getMarkersSaga = function* () {
  yield put({
    type: GET_MARKERS_START,
  });
  try {
    yield delay(2000);
    yield put({
      type: GET_MARKERS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: GET_MARKERS_ERROR,
      // payload: { saga: editAccountSaga, sagaPayload: payload },
      error,
    });
  }
};

export function* saga() {
  yield* all([
    takeLatest(GET_MARKERS_REQUEST, getMarkersSaga),
  ]);
}
