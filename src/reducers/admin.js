import {
  ADMIN_REAL_TIME_REQUEST,
  ADMIN_REAL_TIME_SUCCESS,
  ADMIN_REAL_TIME_FAILURE,
  ADMIN_OVERVIEW_INFORMATION_REQUEST,
  ADMIN_OVERVIEW_INFORMATION_SUCCESS,
  ADMIN_OVERVIEW_INFORMATION_FAILURE,
  ADMIN_OVERVIEW_ALARM_REQUEST,
  ADMIN_OVERVIEW_ALARM_SUCCESS,
  ADMIN_OVERVIEW_ALARM_FAILURE,
  ADMIN_SUMMARY_INFORMATION_REQUEST,
  ADMIN_SUMMARY_INFORMATION_SUCCESS,
  ADMIN_SUMMARY_INFORMATION_FAILURE,
  ADMIN_SUMMARY_TABLE_REQUEST,
  ADMIN_SUMMARY_TABLE_SUCCESS,
  ADMIN_SUMMARY_TABLE_FAILURE,
  ADMIN_OUTPUT_TABLE_REQUEST,
  ADMIN_OUTPUT_TABLE_SUCCESS,
  ADMIN_OUTPUT_TABLE_FAILURE,
  ADMIN_DOWNTIME_TABLE_REQUEST,
  ADMIN_DOWNTIME_TABLE_SUCCESS,
  ADMIN_DOWNTIME_TABLE_FAILURE,
  ADMIN_ALARM_TABLE_REQUEST,
  ADMIN_ALARM_TABLE_SUCCESS,
  ADMIN_ALARM_TABLE_FAILURE,
  MAP_CONNECT_REQUEST,
  MAP_CONNECT_SUCCESS,
  MAP_CONNECT_FAILURE,
} from '../constants/actionTypes';

const initialState = {
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case MAP_CONNECT_FAILURE:
    case MAP_CONNECT_SUCCESS:
      return {
        ...state,
        ...action,
      };
    case MAP_CONNECT_REQUEST:
      return {
        ...action,
      };
    case ADMIN_REAL_TIME_REQUEST:
    case ADMIN_REAL_TIME_SUCCESS:
    case ADMIN_REAL_TIME_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_OVERVIEW_INFORMATION_REQUEST:
    case ADMIN_OVERVIEW_INFORMATION_SUCCESS:
    case ADMIN_OVERVIEW_INFORMATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_OVERVIEW_ALARM_REQUEST:
    case ADMIN_OVERVIEW_ALARM_SUCCESS:
    case ADMIN_OVERVIEW_ALARM_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_SUMMARY_INFORMATION_REQUEST:
    case ADMIN_SUMMARY_INFORMATION_SUCCESS:
    case ADMIN_SUMMARY_INFORMATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_SUMMARY_TABLE_REQUEST:
    case ADMIN_SUMMARY_TABLE_SUCCESS:
    case ADMIN_SUMMARY_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_OUTPUT_TABLE_REQUEST:
    case ADMIN_OUTPUT_TABLE_SUCCESS:
    case ADMIN_OUTPUT_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_DOWNTIME_TABLE_REQUEST:
    case ADMIN_DOWNTIME_TABLE_SUCCESS:
    case ADMIN_DOWNTIME_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case ADMIN_ALARM_TABLE_REQUEST:
    case ADMIN_ALARM_TABLE_SUCCESS:
    case ADMIN_ALARM_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
      };
  }
};

export default admin;
