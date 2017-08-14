import 'whatwg-fetch';
import moment from 'moment';
import _ from 'lodash';

import * as types from '../constants/actionTypes';

// TODO(S.C.) => url need to be changed as production
const serverConfig = {
  // url: 'http://Lmsr175.calcomp.co.th:3000/apis',
  // url: 'http://172.21.37.5:5001/apis',
  // url: 'http://127.0.0.1:5001/apis',
  url: 'http://10.5.82.105:3000/apis',
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

export const doRequestCount = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_COUNT_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/get/output`+
      `?countryName=${countryName}`+
      `&factoryName=${factoryName}`+
      `&plantName=${plantName}`+
      `&lineName=${lineName}`+
      `&equipmentName=${equipmentName}`+
      `&timeZone=${timeZone}`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_COUNT_SUCCESS,
        countData: data,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_COUNT_FAILURE,
        countData: [],
      });
    });
  }
}

export const doRequestMapConnect = (passProps) => {
  const plant = passProps.plant;
  return (dispatch) => {
    dispatch({
      type: types.MAP_CONNECT_REQUEST,
    });
    fetch(`${serverConfig.url}/v0/map/${plant}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.MAP_CONNECT_SUCCESS,
          connectStatus: data,
        });
      })
      .catch((err) => {
        console.log(err);
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

export const doRequestOutput = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const date = passProps.date;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  let fetchUrl = `${serverConfig.url}/v0/get/output`+
    `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`+
    `&equipmentName=${equipmentName}`+
    `&timeZone="${timeZone}"`+
    `&timeUnit="${timeUnit}"`;
  if (timeUnit === 'hour') fetchUrl += `&date="${date}"`;
  else fetchUrl +=`&startDate="${startDate}"&endDate="${endDate}"`

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OUTPUT_CHART_REQUEST,
    })
    fetch(fetchUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_OUTPUT_CHART_SUCCESS,
        outputData: data.payload,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_OUTPUT_CHART_FAILURE,
        outputData: [],
      });
    });
  }
}

export const doRequestAlarmHour = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const date = passProps.date;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_HOUR_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/get/alarm`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`+
      `&equipmentName=${equipmentName}`+
      `&timeZone="${timeZone}"`+
      `&timeUnit="${timeUnit}"`+
      `&date="${date}"`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_ALARM_HOUR_SUCCESS,
        alarmHourData: data.payload,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_ALARM_HOUR_FAILURE,
        alarmHourData: [],
      });
    });
  }
}

export const doRequestAlarmDate = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_DATE_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/get/alarm`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`+
      `&equipmentName=${equipmentName}`+
      `&timeZone="${timeZone}"`+
      `&timeUnit="${timeUnit}"`+
      `&startDate="${startDate}"`+
      `&endDate="${endDate}"`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_ALARM_DATE_SUCCESS,
        alarmDateData: data.payload,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_ALARM_DATE_FAILURE,
        alarmDateData: [],
      });
    });
  }
}

export const doRequestAlarmMonth = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_MONTH_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/get/alarm`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`+
      `&equipmentName=${equipmentName}`+
      `&timeZone="${timeZone}"`+
      `&timeUnit="${timeUnit}"`+
      `&startDate="${startDate}"`+
      `&endDate="${endDate}"`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_ALARM_MONTH_SUCCESS,
        alarmMonthData: data.payload,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_ALARM_MONTH_FAILURE,
        alarmMonthData: [],
      });
    });
  }
}

export const doRequestAlarmDuration = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_DURATION_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/get/alarm`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`+
      `&equipmentName=${equipmentName}`+
      `&timeZone="${timeZone}"`+
      `&timeUnit="${timeUnit}"`+
      `&startDate="${startDate}"`+
      `&endDate="${endDate}"`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.ADMIN_ALARM_DURATION_SUCCESS,
        alarmDurationData: data.payload,
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_ALARM_DURATION_FAILURE,
        alarmDurationData: [],
      });
    });
  }
}

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

// get world map from api
export const doRequestForWorldMap = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.WORLD_MAP_REQUEST,
      worldMapData: [],
    });
    fetch(`${serverConfig.url}/v0/geo/countries`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.WORLD_MAP_SUCCESS,
          worldMapData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.WORLD_MAP_FAILURE,
          worldMapData: [],
        });
      });
  };
};

// get factory map from api
export const doRequestForFactoryMap = (passProps) => {
  const factory = passProps.factory;
  return (dispatch) => {
    dispatch({
      type: types.FACTORY_MAP_REQUEST,
      factoryMapData: {},
    });
    fetch(`${serverConfig.url}/v0/geo/factories?factory=${factory}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.FACTORY_MAP_SUCCESS,
          factoryMapData: data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.FACTORY_MAP_FAILURE,
          factoryMapData: {},
        });
      });
  };
};

// get plants map from api
export const doRequestForPlantMap = (passProps) => {
  const factory = passProps.factory;
  const plant = passProps.plant;
  return (dispatch) => {
    dispatch({
      type: types.PLANT_MAP_REQUEST,
      plantMapData: {},
    });
    fetch(`${serverConfig.url}/v0/geo/plants?factory=${factory}&plant=${plant}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: types.PLANT_MAP_SUCCESS,
          plantMapData: data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.PLANT_MAP_FAILURE,
          plantMapData: {},
        });
      });
  };
};
