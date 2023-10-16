import { PlaylistAddOutlined } from "@mui/icons-material";
import {
  SELF_SIGN_UP_REQUEST,
  SELF_SIGN_UP_SUCCESS,
  SELF_SIGN_UP_FAILURE,
  FETCH_COMPLETEMENT_STEPS_REQUEST,
  FETCH_COMPLETEMENT_STEPS_SUCCESS,
  FETCH_COMPLETEMENT_STEPS_FAILURE,
  POST_COMPLETEMENT_STEPS_REQUEST,
  POST_COMPLETEMENT_STEPS_SUCCESS,
  POST_COMPLETEMENT_STEPS_FAILURE,
  SET_CLOSE_MODAL_STEP,
  SET_OPEN_MODAL_STEP,
  POST_PERSONAL_DETAILS_REQUEST,
  POST_PERSONAL_DETAILS_SUCCESS,
  POST_PERSONAL_DETAILS_FAILURE,
  POST_SIGNUP_BONUS_REQUEST,
  POST_SIGNUP_BONUS_SUCCESS,
  POST_SIGNUP_BONUS_FAILURE,
  POST_PURCHASE_POINTS_REQUEST,
  POST_PURCHASE_POINTS_SUCCESS,
  POST_PURCHASE_POINTS_FAILURE,
  POST_BIRTHDAYS_SETUP_REQUEST,
  POST_BIRTHDAYS_SETUP_SUCCESS,
  POST_BIRTHDAYS_SETUP_FAILURE,
} from "./actionTypes";

import { SelfSignupState, SelfSignupActions } from "./types";

const initialState: SelfSignupState = {
  pending: false,
  completementSteps: [],
  openModalStep: "NONE",
  error: null,
};

export default (state = initialState, action: SelfSignupActions) => {
  switch (action.type) {
    case SELF_SIGN_UP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SELF_SIGN_UP_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case SELF_SIGN_UP_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case FETCH_COMPLETEMENT_STEPS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COMPLETEMENT_STEPS_SUCCESS:
      return {
        ...state,
        pending: false,
        completementSteps: action.payload.completementsSteps,
        error: null,
      };
    case FETCH_COMPLETEMENT_STEPS_FAILURE:
      return {
        ...state,
        pending: false,
        completementSteps: [],
        error: action.payload.error,
      };
    case POST_COMPLETEMENT_STEPS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_COMPLETEMENT_STEPS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_COMPLETEMENT_STEPS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case SET_OPEN_MODAL_STEP:
      return {
        ...state,
        openModalStep: action.payload.openModalStep,
        pending: true,
        error: null,
      };
    case SET_CLOSE_MODAL_STEP:
      return {
        ...state,
        openModalStep: "NONE",
        pending: true,
        error: null,
      };
    case POST_PERSONAL_DETAILS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        openModalStep: "NONE",
        error: null,
      };
    case POST_PERSONAL_DETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case POST_SIGNUP_BONUS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_SIGNUP_BONUS_SUCCESS:
      return {
        ...state,
        pending: false,
        openModalStep: "NONE",
        error: null,
      };
    case POST_SIGNUP_BONUS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case POST_PURCHASE_POINTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_PURCHASE_POINTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_PURCHASE_POINTS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case POST_BIRTHDAYS_SETUP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_BIRTHDAYS_SETUP_SUCCESS:
      return {
        ...state,
        pending: false,
        openModalStep: "NONE",
        error: null,
      };
    case POST_BIRTHDAYS_SETUP_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
