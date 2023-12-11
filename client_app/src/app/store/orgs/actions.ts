import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST_FAILURE,
  FETCH_ORG_USER_LIST,
  FETCH_ORG_USER_LIST_SUCCESS,
  FETCH_ORG_USER_LIST_FAILURE,
  FETCH_ORG_USER,
  FETCH_ORG_USER_SUCCESS,
  FETCH_ORG_USER_FAILURE,
  DELETE_ORG_USER,
  DELETE_ORG_USER_SUCCESS,
  DELETE_ORG_USER_FAILURE,
  SEND_POINTS_TO_USER,
  SEND_POINTS_TO_USER_SUCCESS,
  SEND_POINTS_TO_USER_FAILURE,
  SET_OPEN_DIALOG_SEND_POINTS,
  SET_CLOSE_DIALOG_SEND_POINTS,
  PEER_SEND_POINTS_TO_USER,
  PEER_SEND_POINTS_TO_USER_SUCCESS,
  PEER_SEND_POINTS_TO_USER_FAILURE,
  SECRET_SANTA_TRIAL,
  SECRET_SANTA_TRIAL_SUCCESS,
  SECRET_SANTA_TRIAL_FAILURE,
} from "./actionTypes";
import {
  FetchOrganization,
  FetchOrganizationSuccess,
  FetchOrganizationSuccessPayload,
  FetchOrganizationFailurePayload,
  FetchOrganizationFailure,
  FetchOrganizationTransactionList,
  FetchOrganizationTransactionListSuccessPayload,
  FetchOrganizationTransactionListSuccess,
  FetchOrganizationTransactionListFailurePayload,
  FetchOrganizationTransactionListFailure,
  FetchOrganizationUserList,
  FetchOrganizationUserListSuccessPayload,
  FetchOrganizationUserListSuccess,
  FetchOrganizationUserListFailurePayload,
  FetchOrganizationUserListFailure,
  FetchOrgUserPayload,
  FetchOrgUser,
  FetchOrgUserSuccessPayload,
  FetchOrgUserSuccess,
  FetchOrgUserFailurePayload,
  FetchOrgUserFailure,
  DeleteOrgUserPayload,
  DeleteOrgUser,
  DeleteOrgUserSuccess,
  DeleteOrgUserFailurePayload,
  DeleteOrgUserFailure,
  SendPointsToUserPayload,
  SendPointsToUser,
  SendPointsToUserSuccess,
  SendPointsToUserFailurePayload,
  SendPointsToUserFailure,
  SetOpenDialogSendPoints,
  SetCloseDialogSendPoints,
  PeerSendPointsToUserPayload,
  PeerSendPointsToUser,
  PeerSendPointsToUserSuccess,
  PeerSendPointsToUserFailurePayload,
  PeerSendPointsToUserFailure,
  SecretSantaTrial,
  SecretSantaTrialSuccess,
  SecretSantaTrialFailurePayload,
  SecretSantaTrialFailure,
} from "./types";

export const fetchOrganization = (): FetchOrganization => ({
  type: FETCH_ORGANIZATION,
});

export const fetchOrganizationSuccess = (
  payload: FetchOrganizationSuccessPayload
): FetchOrganizationSuccess => ({
  type: FETCH_ORGANIZATION_SUCCESS,
  payload,
});

export const fetchOrganizationFailure = (
  payload: FetchOrganizationFailurePayload
): FetchOrganizationFailure => ({
  type: FETCH_ORGANIZATION_FAILURE,
  payload,
});

export const fetchOrganizationTransactionList =
  (): FetchOrganizationTransactionList => ({
    type: FETCH_ORG_TRANSACTION_LIST,
  });

export const fetchOrganizationTransactionListSuccess = (
  payload: FetchOrganizationTransactionListSuccessPayload
): FetchOrganizationTransactionListSuccess => ({
  type: FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  payload,
});

export const fetchOrganizationTransactionListFailure = (
  payload: FetchOrganizationTransactionListFailurePayload
): FetchOrganizationTransactionListFailure => ({
  type: FETCH_ORG_TRANSACTION_LIST_FAILURE,
  payload,
});

export const fetchOrganizationUserList = (): FetchOrganizationUserList => ({
  type: FETCH_ORG_USER_LIST,
});

export const fetchOrganizationUserListSuccess = (
  payload: FetchOrganizationUserListSuccessPayload
): FetchOrganizationUserListSuccess => ({
  type: FETCH_ORG_USER_LIST_SUCCESS,
  payload,
});

export const fetchOrganizationUserListFailure = (
  payload: FetchOrganizationUserListFailurePayload
): FetchOrganizationUserListFailure => ({
  type: FETCH_ORG_USER_LIST_FAILURE,
  payload,
});

export const fetchOrgUser = (payload: FetchOrgUserPayload): FetchOrgUser => ({
  type: FETCH_ORG_USER,
  payload,
});

export const fetchOrgUserSuccess = (
  payload: FetchOrgUserSuccessPayload
): FetchOrgUserSuccess => ({
  type: FETCH_ORG_USER_SUCCESS,
  payload,
});

export const fetchOrgUserFailure = (
  payload: FetchOrgUserFailurePayload
): FetchOrgUserFailure => ({
  type: FETCH_ORG_USER_FAILURE,
  payload,
});

export const deleteOrgUser = (
  payload: DeleteOrgUserPayload,
  navigate: Function
): DeleteOrgUser => ({
  type: DELETE_ORG_USER,
  payload,
  navigate,
});

export const deleteOrgUserSuccess = (): DeleteOrgUserSuccess => ({
  type: DELETE_ORG_USER_SUCCESS,
});

export const deleteOrgUserFailure = (
  payload: DeleteOrgUserFailurePayload
): DeleteOrgUserFailure => ({
  type: DELETE_ORG_USER_FAILURE,
  payload,
});

export const sendPointsToUser = (
  payload: SendPointsToUserPayload,
  navigate: Function
): SendPointsToUser => ({
  type: SEND_POINTS_TO_USER,
  payload,
  navigate,
});

export const sendPointsToUserSuccess = (): SendPointsToUserSuccess => ({
  type: SEND_POINTS_TO_USER_SUCCESS,
});

export const sendPointsToUserFailure = (
  payload: SendPointsToUserFailurePayload
): SendPointsToUserFailure => ({
  type: SEND_POINTS_TO_USER_FAILURE,
  payload,
});

export const setOpenDialogSendPoints = (): SetOpenDialogSendPoints => ({
  type: SET_OPEN_DIALOG_SEND_POINTS,
});

export const setCloseDialogSendPoints = (): SetCloseDialogSendPoints => ({
  type: SET_CLOSE_DIALOG_SEND_POINTS,
});

export const peerSendPointsToUser = (
  payload: PeerSendPointsToUserPayload,
  navigate: Function
): PeerSendPointsToUser => ({
  type: PEER_SEND_POINTS_TO_USER,
  payload,
  navigate,
});

export const peerSendPointsToUserSuccess = (): PeerSendPointsToUserSuccess => ({
  type: PEER_SEND_POINTS_TO_USER_SUCCESS,
});

export const peerSendPointsToUserFailure = (
  payload: PeerSendPointsToUserFailurePayload
): PeerSendPointsToUserFailure => ({
  type: PEER_SEND_POINTS_TO_USER_FAILURE,
  payload,
});

export const secretSantaTrial = (): SecretSantaTrial => ({
  type: SECRET_SANTA_TRIAL,
});

export const secretSantaTrialSuccess = (): SecretSantaTrialSuccess => ({
  type: SECRET_SANTA_TRIAL_SUCCESS,
});

export const secretSantaTrialFailure = (
  payload: SecretSantaTrialFailurePayload
): SecretSantaTrialFailure => ({
  type: SECRET_SANTA_TRIAL_FAILURE,
  payload,
});
