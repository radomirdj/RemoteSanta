import {
  FETCH_CLAIM_POINTS_EVENT_LIST, FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS, FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE
} from "./actionTypes";

export interface IClaimPointsEventFullFillment{
  id: string;
  amount: number;
  userId: string;
  createdAt: Date;
}

export interface IClaimPointEvent {
  id: string;
  validTo:Date;
  amount?:number;
  description:string;
  claimPointsEventFulfillment?: IClaimPointsEventFullFillment;
}

export interface ClaimPointsEventState {
  pending: boolean;
  claimPointsEventList: IClaimPointEvent[];
  error: string | null;
}

export interface FetchClaimPointsEventListSuccessPayload {
  claimPointsEventList: IClaimPointEvent[];
}

export interface FetchClaimPointsEventListFailurePayload {
  error: string;
}

export interface FetchClaimPointsEventList{
  type: typeof FETCH_CLAIM_POINTS_EVENT_LIST;
}

export interface FetchClaimPointsEventListSuccess {
  type: typeof FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS,
  payload:FetchClaimPointsEventListSuccessPayload 
}

export interface FetchClaimPointsEventListFailure {
  type: typeof FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE;
  payload:FetchClaimPointsEventListFailurePayload
}

export type ClaimPointsEventActions =
  | FetchClaimPointsEventList
  | FetchClaimPointsEventListSuccess
  | FetchClaimPointsEventListFailure;
