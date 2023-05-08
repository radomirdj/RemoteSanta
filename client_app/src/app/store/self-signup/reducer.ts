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
    default:
      return {
        ...state,
      };
  }
};
