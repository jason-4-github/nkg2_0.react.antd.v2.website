import 'whatwg-fetch';
import moment from 'moment';
import _ from 'lodash';

import * as types from '../constants/actionTypes';

// TODO(S.C.) => url need to be changed as production
const serverConfig = {
  url: 'http://172.21.37.5:5001/apis',
  // url: 'http://127.0.0.1:5001/apis',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const doRequestMapConnect = (passProps) => {
  const plant = passProps.plant;
  return (dispatch) => {
    dispatch({
      type: types.MAP_CONNECT_REQUEST,
    });
    fetch(`${serverConfig.url}/map/${plant}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.MAP_CONNECT_SUCCESS,
          connectStatus: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.MAP_CONNECT_FAILURE,
          connectStatus: [],
        });
      });
  };
};

export const doRequestRealTime = (passProps) => {
  const line = passProps.line;
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_REAL_TIME_REQUEST,
    });
    fetch(`${serverConfig.url}/dashboard/realTime/${line}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_REAL_TIME_SUCCESS,
          realTimeData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_REAL_TIME_FAILURE,
          realTimeData: [],
        });
      });
  };
};

export const doRequestOverviewInformation = (passProps) => {
  const line = passProps.line;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OVERVIEW_INFORMATION_REQUEST,
      overviewInformationData: [],
    });
    fetch(`${serverConfig.url}/dashboard/overview/information/${line}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_OVERVIEW_INFORMATION_SUCCESS,
          overviewInformationData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_OVERVIEW_INFORMATION_FAILURE,
          overviewInformationData: [],
        });
      });
  };
};

export const doRequestOverviewAlarmInfo = (passProps) => {
  const line = passProps.line;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OVERVIEW_ALARM_REQUEST,
      overviewAlarmData: [],
    });
    fetch(`${serverConfig.url}/dashboard/overview/status/${line}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_OVERVIEW_ALARM_SUCCESS,
          overviewAlarmData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_OVERVIEW_ALARM_FAILURE,
          overviewAlarmData: [],
        });
      });
  };
};

export const doRequestSummaryInformation = (passProps) => {
  const line = passProps.line;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_SUMMARY_INFORMATION_REQUEST,
      summaryInformationData: [],
    });
    fetch(`${serverConfig.url}/dashboard/summary/information/${line}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_SUMMARY_INFORMATION_SUCCESS,
          summaryInformationData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_SUMMARY_INFORMATION_FAILURE,
          summaryInformationData: [],
        });
      });
  };
};

export const doRequestSummaryTable = (passProps) => {
  const line = passProps.line;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_SUMMARY_TABLE_REQUEST,
      summaryTableData: [],
    });
    fetch(`${serverConfig.url}/dashboard/summary/${line}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_SUMMARY_TABLE_SUCCESS,
          summaryTableData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_SUMMARY_TABLE_FAILURE,
          summaryTableData: [],
        });
      });
  };
};

export const doRequestOutputTable = (passProps) => {
  const line = passProps.line;
  const date = !passProps.date ? moment().format('YYYY-MM-DD') : passProps.date;
  const filter = passProps.filter;

  let token;
  let dateFormatted;
  if (filter === 'hour') {
    token = 0;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'date') {
    token = 1;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'month') {
    token = 2;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'year') {
    token = 3;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  }

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OUTPUT_TABLE_REQUEST,
      outputTableData: [],
    });
    fetch(`${serverConfig.url}/dashboard/output/${line}/${token}?time=${dateFormatted}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        const dataProcessed = [];

        if (filter === 'hour') {
          _.map(data, (d) => {
            dataProcessed.push({
              InputCout: d.InputCout,
              OutputNGCount: d.OutputNGCount,
              OutputOKCount: d.OutputOKCount,
              timeStamp: d.iDateH,
            });
          });
        } else if (filter === 'date') {
          _.map(data, (d) => {
            dataProcessed.push({
              InputCout: d.InputCout,
              OutputNGCount: d.OutputNGCount,
              OutputOKCount: d.OutputOKCount,
              timeStamp: d.sDateYMD,
            });
          });
        } else if (filter === 'month') {
          _.map(data, (d) => {
            dataProcessed.push({
              InputCout: d.InputCout,
              OutputNGCount: d.OutputNGCount,
              OutputOKCount: d.OutputOKCount,
              timeStamp: d.sDateYM,
            });
          });
        } else if (filter === 'year') {
          _.map(data, (d) => {
            dataProcessed.push({
              InputCout: d.InputCout,
              OutputNGCount: d.OutputNGCount,
              OutputOKCount: d.OutputOKCount,
              timeStamp: d.sDateY,
            });
          });
        }

        dispatch({
          type: types.ADMIN_OUTPUT_TABLE_SUCCESS,
          outputTableData: dataProcessed,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_OUTPUT_TABLE_FAILURE,
          outputTableData: [],
        });
      });
  };
};

export const doRequestDowntimeTable = (passProps) => {
  const line = passProps.line;
  const date = !passProps.date ? moment().format('YYYY-MM-DD') : passProps.date;
  const filter = passProps.filter;

  let token;
  let dateFormatted;
  if (filter === 'date') {
    token = 0;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'week') {
    token = 1;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'month') {
    token = 2;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  } else if (filter === 'year') {
    token = 3;
    dateFormatted = moment(date).format('YYYY.MM.DD');
  }

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_DOWNTIME_TABLE_REQUEST,
      downtimeTableData: [],
    });
    fetch(`${serverConfig.url}/dashboard/downtime/${line}?date=${dateFormatted}&token=${token}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_DOWNTIME_TABLE_SUCCESS,
          downtimeTableData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_DOWNTIME_TABLE_FAILURE,
          downtimeTableData: [],
        });
      });
  };
};

export const doRequestAlarmTable = (passProps) => {
  const line = passProps.line;
  const date = passProps.date;
  const filter = passProps.filter;

  let startTime;
  let endTime;

  if (filter === 'date') {
    const dateFormatted = moment(date).format('YYYY.MM.DD');

    startTime = `${dateFormatted} 00:00:00`;
    endTime = `${dateFormatted} 23:59:59`;
  } else if (filter === 'week') {
    const dateTo = moment(date).format('YYYY.MM.DD');
    const dateFrom = moment(date).subtract(6, 'd').format('YYYY.MM.DD');

    startTime = `${dateFrom} 00:00:00`;
    endTime = `${dateTo} 23:59:59`;
  } else if (filter === 'month') {
    const dateFormat = date.split('-');
    const days = moment(dateFormat[1]).daysInMonth();
    const dateFormatted = moment(date).format('YYYY.MM');

    startTime = `${dateFormatted}.01 00:00:00`;
    endTime = `${dateFormatted}.${days} 23:59:59`;
  }

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_TABLE_REQUEST,
      alarmChartData: [],
    });
    fetch(`${serverConfig.url}/dashboard/alarm/${line}?startTime=${startTime}&endTime=${endTime}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.ADMIN_ALARM_TABLE_SUCCESS,
          alarmChartData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.ADMIN_ALARM_TABLE_FAILURE,
          alarmChartData: [],
        });
      });
  };
};
