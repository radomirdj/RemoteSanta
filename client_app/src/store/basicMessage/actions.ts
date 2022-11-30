import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE
} from "./actionTypes";
import {
  FetchMessageRequest,
  FetchMessageSuccess,
  FetchMessageSuccessPayload,
  FetchMessageFailure,
  FetchMessageFailurePayload
} from "./types";

export const fetchMessageRequest = (): FetchMessageRequest => ({
  type: FETCH_MESSAGE_REQUEST
});

export const fetchMessageSuccess = (
  payload: FetchMessageSuccessPayload
): FetchMessageSuccess => ({
  type: FETCH_MESSAGE_SUCCESS,
  payload
});

export const fetchMessageFailure = (
  payload: FetchMessageFailurePayload
): FetchMessageFailure => ({
  type: FETCH_MESSAGE_FAILURE,
  payload
});
