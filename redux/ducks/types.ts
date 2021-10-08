import {
  GET_MARKERS_REQUEST,
  GET_MARKERS_START,
  GET_MARKERS_SUCCESS,
  GET_MARKERS_ERROR,
} from './markers';

export interface MarkersState {
  markers: Markers[] | null;
  loading: boolean;
}
export type Markers = {
  row: {
    longitude: any,
    number: string,
    address: string,
    adress?: string,
  };
  num_id: number
};
export interface GetMarkersSuccessPayload {
  markers: Markers[];
}

export type GetMarkersRequest = {
  type: typeof GET_MARKERS_REQUEST;
};

export type GetMarkersStart = {
  type: typeof GET_MARKERS_START;
};

export type GetMarkersSuccess = {
  type: typeof GET_MARKERS_SUCCESS;
  payload: GetMarkersSuccessPayload;
};

export type GetMarkersError = {
  type: typeof GET_MARKERS_ERROR;
};


export type MarkersActions =
  | GetMarkersRequest
  | GetMarkersStart
  | GetMarkersSuccess
  | GetMarkersError;
