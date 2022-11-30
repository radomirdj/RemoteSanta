import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE
} from "./actionTypes";

export interface MessageState {
  pending: boolean;
  message: string;
  error: string | null;
}

export interface FetchMessageSuccessPayload {
  message: string;
}

export interface FetchMessageFailurePayload {
  error: string;
}

export interface FetchMessageRequest {
  type: typeof FETCH_MESSAGE_REQUEST;
}

export type FetchMessageSuccess = {
  type: typeof FETCH_MESSAGE_SUCCESS;
  payload: FetchMessageSuccessPayload;
};

export type FetchMessageFailure = {
  type: typeof FETCH_MESSAGE_FAILURE;
  payload: FetchMessageFailurePayload;
};

export type MessageActions =
  | FetchMessageRequest
  | FetchMessageSuccess
  | FetchMessageFailure;
