import { takeLatest, put, all, call } from 'typed-redux-saga';
import { MarkersState, MarkersActions, Markers } from './types';
import { RootState } from '../store';
import apiService from '../../api';
import { dataToStore, retrieveData } from '../../etc/AsyncStorageManipulator';

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
export default function markersReducer(state = initialState, action: MarkersActions): MarkersState {
  switch (action.type) {
    case GET_MARKERS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_MARKERS_SUCCESS:
      return {
        ...state,
        markers: action.payload.markers,
        loading: false,
      };
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
export const markersSelector = (state: RootState) => state.markersReducer.markers;
export const loadingSelector = (state: RootState) => state.markersReducer.loading;


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
    interface IсurrID {
      data: {
        num_id: number;
      };
    }
    let allMarkers: Array<Markers> = [];
    const сurrID: IсurrID = yield* call(apiService.getVersionNumber);
    const savedID: number = yield* call(retrieveData, 'markersPackageID');
    if (сurrID.data.num_id !== savedID) {
      let counter = 1;
      let { data } :{ data: Markers[] } = { data:[] };
      do {
        ({ data } = (yield* call(apiService.getCameraData, counter)));
        counter += 1;
        allMarkers.push(...data);
      } while (data.length >= 100);
      allMarkers.map(item  => {
        const result = { ...item };
        const { longitude } = item.row;
        const array = longitude.split(',');
        const obj = {
          latitude: Number(array[0]),
          longitude:Number(array[1]),
        };
        result.row.longitude = obj;
        return result;
      });
      yield call(dataToStore, 'markersPackageID', сurrID.data.num_id);
      yield call(dataToStore, 'allMarkers', allMarkers);
    } else {
      allMarkers = yield* call(retrieveData, 'allMarkers');
    }
    yield put({
      type: GET_MARKERS_SUCCESS,
      payload: { markers: allMarkers },
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: GET_MARKERS_ERROR,
    });
  }
};

export function* saga() {
  yield* all([
    takeLatest(GET_MARKERS_REQUEST, getMarkersSaga),
  ]);
}
