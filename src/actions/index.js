import 'whatwg-fetch';
import moment from 'moment';
import _ from 'lodash';

import * as types from '../constants/actionTypes';

// TODO(S.C.) => url need to be changed as production
const serverConfig = {
  url: 'http://Lmsr175.calcomp.co.th:3000/apis',
  // url: 'http://172.21.37.5:5001/apis',
  // url: 'http://127.0.0.1:5001/apis',
  // url: 'http://10.5.82.105:3000/apis',
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

export const doRequestOverviewTable = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  let fetchApiName = 'list/equipmentsOfLine';
  let fetchBasicInfo = `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`;
  let fetchUrl = `${serverConfig.url}/v0/${fetchApiName}${fetchBasicInfo}`;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OVERVIEW_TABLE_REQUEST,
    })
    fetch(fetchUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // data: { success, equipments };
      const timeZone = 'Asia/Bangkok';
      const startDate = moment().format('YYYY-MM-DD');
      const endDate = startDate;
      const collectData = [];
      let timeUnit = 'date';

      _.map(data.equipments, (value) => {
        const dataObj = {};
        dataObj.equipmentName = value;
        const equipmentDeconstruct = value.split('-');
        const equipmentName = equipmentDeconstruct[0];
        const equipmentSerial = equipmentDeconstruct[1];
        fetchApiName = 'get/output'
        fetchUrl = `${serverConfig.url}/v0/${fetchApiName}${fetchBasicInfo}`;
        // call output Api after get equipmentName
        fetch(`${fetchUrl}&timeZone="${timeZone}"` +
          `&timeUnit="${timeUnit}"&startDate="${startDate}"&endDate="${endDate}"` +
          `&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`)
        .then(checkStatus)
        .then(parseJSON)
        .then((outputData) => {
          // outputData: { success, payload: { id, time, okQuantity, ngQuantity } };
          const compareDate = moment().format('M/D');
          _.map(outputData.payload, (outputValue) => {
            if (outputValue.time === compareDate) {
              dataObj.okQuantity = outputValue.okQuantity;
              dataObj.ngQuantity = outputValue.ngQuantity;
              dataObj.inputQuantity = outputValue.ngQuantity + outputValue.okQuantity;
            }
          });

          // set the alarm api url config
          fetchApiName = 'get/alarm'
          fetchUrl = `${serverConfig.url}/v0/${fetchApiName}${fetchBasicInfo}`;
          timeUnit = 'hour';

          // call alarm Api after get outputData
          fetch(`${fetchUrl}&timeZone="${timeZone}"&timeUnit="${timeUnit}"&date="${startDate}"`+
            `&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`)
          .then(checkStatus)
          .then(parseJSON)
          .then((alarmData) => {

            // alarmData: { success, payload: { equipmentName, status: { description: { errorCode }, totalAlarmTime, count } } };
            let totalTime = 0;
            _.map(alarmData.payload.status, (alarmValue) => {
              if (alarmValue.totalAlarmTime) totalTime += alarmValue.totalAlarmTime;
            });
            // TODO(jasonHsu): record time need to modify
            dataObj.alarmTime = totalTime;
            collectData.push(dataObj);
            if (collectData.length === data.equipments.length) {
              dispatch({
                type: types.ADMIN_OVERVIEW_TABLE_SUCCESS,
                overviewTableData: collectData,
              });
            }
          })
          .catch((err) => {
            console.log('get alarm Error: ', err);
          });
        })
        .catch((err) => {
          console.log('get output Error: ', err);
        });
      });
    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_OVERVIEW_TABLE_FAILURE,
        overviewTableData: [],
      });
    });
  }
}

export const doRequestCount = (passProps) => {
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const equipmentName = passProps.equipmentName;
  const equipmentSerial = passProps.equipmentSerial;
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
      `&equipmentSerial=${equipmentSerial}`+
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
  console.log(moment().format('M/D'));
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  const timeZone = passProps.timeZone;
  let equipmentName = passProps.equipmentName;
  let equipmentSerial = passProps.equipmentSerial;
  const timeUnit = passProps.actionType;
  const date = passProps.date;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  let fetchUrl = `${serverConfig.url}/v0/get/output`+
    `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`+
    `&equipmentName="${equipmentName}"`+
    `&equipmentSerial="${equipmentSerial}"`+
    `&timeZone="${timeZone}"`+
    `&timeUnit="${timeUnit}"`;
  if (timeUnit === 'hour') fetchUrl += `&date="${date}"`;
  else fetchUrl +=`&startDate="${startDate}"&endDate="${endDate}"`
    console.log('ssss', fetchUrl);

  if (equipmentName !== undefined) {
    return (dispatch) => {
      dispatch({
        type: types.ADMIN_OUTPUT_CHART_REQUEST,
      })
      fetch(fetchUrl).then(checkStatus)
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

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OUTPUT_CHART_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/list/equipmentsOfLine`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`
    ).then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      equipmentName = data.equipments[0].split('-')[0];
      equipmentSerial = data.equipments[0].split('-')[1];
      fetchUrl = `${serverConfig.url}/v0/get/output`+
        `?countryName="${countryName}"`+
        `&factoryName="${factoryName}"`+
        `&plantName="${plantName}"`+
        `&lineName="${lineName}"`+
        `&equipmentName="${equipmentName}"`+
        `&equipmentSerial="${equipmentSerial}"`+
        `&timeZone="${timeZone}"`+
        `&timeUnit="${timeUnit}"`;
      if (timeUnit === 'hour') fetchUrl += `&date="${date}"`;
      else fetchUrl +=`&startDate="${startDate}"&endDate="${endDate}"`

      fetch(fetchUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then((outputData) => {
        _.map(outputData.payload, (value, key) => {
          console.log('vvvv', );
        });
        dispatch({
          type: types.ADMIN_OUTPUT_CHART_SUCCESS,
          outputData: outputData.payload,
        });
      })
      .catch((err) => {
        console.log('sss', err);
        dispatch({
          type: types.ADMIN_OUTPUT_CHART_FAILURE,
          outputData: [],
        });
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

export const doRequestAlarm = (passProps) => {
  console.log(passProps);
  const countryName = passProps.countryName;
  const factoryName = passProps.factoryName;
  const plantName = passProps.plantName;
  const lineName =  passProps.lineName;
  let equipmentName = passProps.equipmentName;
  let equipmentSerial = passProps.equipmentSerial;
  const timeZone = passProps.timeZone;
  const timeUnit = passProps.actionType;
  const date = passProps.date;
  const startDate = passProps.startTime;
  const endDate = passProps.endTime;

  let fetchUrl = `${serverConfig.url}/v0/get/alarm`+
    `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`+
    `&equipmentName="${equipmentName}"`+
    `&equipmentSerial="${equipmentSerial}"`+
    `&timeZone="${timeZone}"`+
    `&timeUnit="${timeUnit}"`;
  if (timeUnit === 'hour') fetchUrl += `&date="${date}"`;
  else fetchUrl +=`&startDate="${startDate}"&endDate="${endDate}"`

  if (equipmentName !== undefined) {
    return (dispatch) => {
      dispatch({
        type: types.ADMIN_ALARM_CHART_REQUEST,
      })
      fetch(fetchUrl).then(checkStatus)
      .then(parseJSON)
      .then((alarmData) => {
        let sortedData = [];
        _.map(alarmData.payload.status, (value, key) => {
          if (value.totalAlarmTime) {
          let rebuildObj = {};
          _.map(value, (innerValue, innerKey) => {
              if (innerKey === 'description') rebuildObj.description = innerValue.description.en;
              else rebuildObj[innerKey] = innerValue;
            });
            rebuildObj.alarmCode = key;
            rebuildObj.equipmentName = alarmData.payload.equipmentName;
            sortedData.push(rebuildObj);
          }
        });

        // sort data from higher to lower
        sortedData = _.sortBy(sortedData, [(data) => { return data.count }]).reverse();

        dispatch({
          type: types.ADMIN_ALARM_CHART_SUCCESS,
          alarmData: sortedData,
        })
      })
      .catch((err) => {
        console.log('sss', err);
        dispatch({
          type: types.ADMIN_ALARM_CHART_FAILURE,
          alarmData: [],
        });
      });
    }
  }

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_CHART_REQUEST,
    })
    fetch(`${serverConfig.url}/v0/list/equipmentsOfLine`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`
    ).then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      equipmentName = data.equipments[0].split('-')[0];
      equipmentSerial = data.equipments[0].split('-')[1];
      fetchUrl = `${serverConfig.url}/v0/get/alarm`+
        `?countryName="${countryName}"`+
        `&factoryName="${factoryName}"`+
        `&plantName="${plantName}"`+
        `&lineName="${lineName}"`+
        `&equipmentName="${equipmentName}"`+
        `&equipmentSerial="${equipmentSerial}"`+
        `&timeZone="${timeZone}"`+
        `&timeUnit="${timeUnit}"`;
      if (timeUnit === 'hour') fetchUrl += `&date="${date}"`;
      else fetchUrl +=`&startDate="${startDate}"&endDate="${endDate}"`

      fetch(fetchUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then((alarmData) => {
        // desperate the empty data by count
        let sortedData = [];
        _.map(alarmData.payload.status, (value, key) => {
          if (value.totalAlarmTime) {
          let rebuildObj = {};
          _.map(value, (innerValue, innerKey) => {
              if (innerKey === 'description') rebuildObj.description = innerValue.description.en;
              else rebuildObj[innerKey] = innerValue;
            });
            rebuildObj.alarmCode = key;
            rebuildObj.equipmentName = alarmData.payload.equipmentName;
            sortedData.push(rebuildObj);
          }
        });

        // sort data from higher to lower
        sortedData = _.sortBy(sortedData, [(data) => { return data.count }]).reverse();

        dispatch({
          type: types.ADMIN_ALARM_CHART_SUCCESS,
          alarmData: sortedData,
        });
      })
      .catch((err) => {
        console.log('sss', err);
        dispatch({
          type: types.ADMIN_ALARM_CHART_FAILURE,
          alarmData: [],
        });
      });
    })
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
