import * as types from '../constants/actionTypes';

const initialState = {
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_ALARM_CHART_REQUEST:
    case types.ADMIN_ALARM_CHART_SUCCESS:
    case types.ADMIN_ALARM_CHART_FAILURE:
      return {
        ...state,
        ...action,
      }
    case types.ADMIN_OUTPUT_CHART_REQUEST:
    case types.ADMIN_OUTPUT_CHART_SUCCESS:
    case types.ADMIN_OUTPUT_CHART_FAILURE:
      return {
        ...state,
        ...action,
      }
    case types.ADMIN_COUNT_REQUEST:
    case types.ADMIN_COUNT_SUCCESS:
    case types.ADMIN_COUNT_FAILURE:
      return {
        ...state,
        ...action,
      }
    case types.MAP_CONNECT_FAILURE:
    case types.MAP_CONNECT_SUCCESS:
      return {
        ...state,
        ...action,
      };
    case types.MAP_CONNECT_REQUEST:
      return {
        ...action,
      };
    case types.WORLD_MAP_REQUEST:
    case types.WORLD_MAP_SUCCESS:
    case types.WORLD_MAP_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.PLANT_MAP_REQUEST:
    case types.PLANT_MAP_SUCCESS:
    case types.PLANT_MAP_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.FACTORY_MAP_REQUEST:
    case types.FACTORY_MAP_SUCCESS:
    case types.FACTORY_MAP_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_REAL_TIME_REQUEST:
    case types.ADMIN_REAL_TIME_SUCCESS:
    case types.ADMIN_REAL_TIME_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_OVERVIEW_INFORMATION_REQUEST:
    case types.ADMIN_OVERVIEW_INFORMATION_SUCCESS:
    case types.ADMIN_OVERVIEW_INFORMATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_OVERVIEW_ALARM_REQUEST:
    case types.ADMIN_OVERVIEW_ALARM_SUCCESS:
    case types.ADMIN_OVERVIEW_ALARM_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_SUMMARY_INFORMATION_REQUEST:
    case types.ADMIN_SUMMARY_INFORMATION_SUCCESS:
    case types.ADMIN_SUMMARY_INFORMATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_SUMMARY_TABLE_REQUEST:
    case types.ADMIN_SUMMARY_TABLE_SUCCESS:
    case types.ADMIN_SUMMARY_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_OUTPUT_TABLE_REQUEST:
    case types.ADMIN_OUTPUT_TABLE_SUCCESS:
    case types.ADMIN_OUTPUT_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_DOWNTIME_TABLE_REQUEST:
    case types.ADMIN_DOWNTIME_TABLE_SUCCESS:
    case types.ADMIN_DOWNTIME_TABLE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case types.ADMIN_ALARM_TABLE_REQUEST:
    case types.ADMIN_ALARM_TABLE_SUCCESS:
    case types.ADMIN_ALARM_TABLE_FAILURE:
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
