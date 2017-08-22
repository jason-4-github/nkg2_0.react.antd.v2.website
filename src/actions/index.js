import 'whatwg-fetch';
import moment from 'moment';
import _ from 'lodash';

import * as types from '../constants/actionTypes';
import serverConfig from './../constants/ipConfig.json';

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

export const doRequestMachineName = (passProps) => {
  const { countryName, factoryName, plantName, lineName } = passProps;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_MACHINE_NAME_REQUEST,
    })
    fetch(`${serverConfig.url}list/equipmentsOfLine`+
      `?countryName="${countryName}"`+
      `&factoryName="${factoryName}"`+
      `&plantName="${plantName}"`+
      `&lineName="${lineName}"`
    )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      console.log(data.equipments);
      dispatch({
        type: types.ADMIN_MACHINE_NAME_SUCCESS,
        machineName: data.equipments,
      });
    })
    .catch(() => {
      dispatch({
        type: types.ADMIN_MACHINE_NAME_FAILURE,
        machineName: [],
      });
    });
  }
}

export const doRequestOverviewTable = (passProps) => {
  const { countryName, factoryName, plantName, lineName } = passProps;

  // params config
  const timeZone = 'Asia/Bangkok';
  const startDate = moment().format('YYYY-MM-DD');
  const endDate = startDate;

  // fetch url config
  let fetchApiName = ['list/equipmentsOfLine', 'get/output', 'get/alarm'];
  let fetchBasicInfo = `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`;
  const timeUnit = ['', 'date', 'hour'];
  const fetchEquipment = `${serverConfig.url}${fetchApiName[0]}${fetchBasicInfo}`;
  const fetchOutput = `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit[1]}"&startDate="${startDate}"&endDate="${endDate}"`;
  const fetchAlarm = `${serverConfig.url}${fetchApiName[2]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit[2]}"&date="${startDate}"`;

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OVERVIEW_TABLE_REQUEST,
    })
    fetch(fetchEquipment)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        // data: { success, equipments };
        const collectData = [];
        const multipleFetch = [];

        _.map(data.equipments, (equipmentsValue) => {
          const dataObj = {};
          const equipmentDeconstruct = equipmentsValue.split('-');
          const equipmentName = equipmentDeconstruct[0];
          const equipmentSerial = equipmentDeconstruct[1];
          dataObj.equipmentName = equipmentsValue;

          multipleFetch.push(
            fetch(`${fetchOutput}&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`)
              .then(checkStatus)
              .then(parseJSON)
              .then((outputData) => {
                // outputData: { success, payload: { id, time, okQuantity, ngQuantity } };

                if (_.isEmpty(outputData.payload)) {
                  dataObj.okQuantity = 0;
                  dataObj.ngQuantity = 0;
                  dataObj.inputQuantity = 0;
                }
                _.map(outputData.payload, (outputValue) => {
                  if (outputValue.time === moment().format('M/D')) {
                    dataObj.okQuantity = outputValue.okQuantity;
                    dataObj.ngQuantity = outputValue.ngQuantity;
                    dataObj.inputQuantity = outputValue.ngQuantity + outputValue.okQuantity;
                  }
                });

                return fetch(`${fetchAlarm}&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`)
              })
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

                return collectData;
              })
              .catch((err) => {
                dispatch({
                  type: types.ADMIN_OVERVIEW_TABLE_FAILURE,
                  overviewTableData: [],
                });
              })
          );
        });

        Promise.all(multipleFetch)
          .then(response => {
            // TODO(jasonHsu): find out the reason that response have two same array
            dispatch({
              type: types.ADMIN_OVERVIEW_TABLE_SUCCESS,
              overviewTableData: response[0],
            });
          })
          .catch(err => {
            console.log('ssskk', err);
            dispatch({
              type: types.ADMIN_OVERVIEW_TABLE_FAILURE,
              overviewTableData: [],
            });
          })
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

export const doRequestMapConnect = (passProps) => {
  const plant = passProps.plant;
  return (dispatch) => {
    dispatch({
      type: types.MAP_CONNECT_REQUEST,
    });
    fetch(`${serverConfig.url}map/${plant}`)
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
  const { countryName, factoryName, plantName, lineName, timeZone,
    timeUnit, date, startDate, endDate } = passProps;
  let { equipmentName, equipmentSerial } = passProps;

  // fetch url config
  const fetchApiName = ['list/equipmentsOfLine', 'get/output'];
  const fetchBasicInfo = `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`;
  const fetchEquipment = `${serverConfig.url}${fetchApiName[0]}${fetchBasicInfo}`;
  const fetchOutputWithoutEquipment =
    `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit}"` +
    ( timeUnit === 'hour' ?  `&date="${date}"` : `&startDate="${startDate}"&endDate="${endDate}"` );
  const fetchOutput = `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit}&equipmentSerial="${equipmentSerial}"&equipmentName="${equipmentName}"` +
    ( timeUnit === 'hour' ?  `&date="${date}"` : `&startDate="${startDate}"&endDate="${endDate}"` );

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_OUTPUT_CHART_REQUEST,
    })
    fetch(fetchEquipment)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        // default fetch
        if (equipmentName !== undefined) return fetch(fetchOutput);

        equipmentName = data.equipments[0].split('-')[0];
        equipmentSerial = data.equipments[0].split('-')[1];
        return fetch(`${fetchOutputWithoutEquipment}&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`);
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((outputData) => {
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
  }
}

export const doRequestAlarm = (passProps) => {
  const { countryName, factoryName, plantName, lineName, timeZone,
    timeUnit, date, startDate, endDate } = passProps;
  let { equipmentName, equipmentSerial } = passProps;

  // fetch url config
  const fetchApiName = ['list/equipmentsOfLine', 'get/alarm'];
  const fetchBasicInfo = `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`;
  const fetchEquipment = `${serverConfig.url}${fetchApiName[0]}${fetchBasicInfo}`;
  const fetchAlarmWithoutEquipment =
    `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit}"` +
    ( timeUnit === 'hour' ?  `&date="${date}"` : `&startDate="${startDate}"&endDate="${endDate}"` );
  const fetchAlarm = `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit}&equipmentSerial="${equipmentSerial}"&equipmentName="${equipmentName}"` +
    ( timeUnit === 'hour' ?  `&date="${date}"` : `&startDate="${startDate}"&endDate="${endDate}"` );

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_ALARM_CHART_REQUEST,
    })
    fetch(fetchEquipment)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (equipmentName !== undefined) return fetch(fetchAlarm);

      equipmentName = data.equipments[0].split('-')[0];
      equipmentSerial = data.equipments[0].split('-')[1];
      return fetch(`${fetchAlarmWithoutEquipment}&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`);
    })
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
  }
}

export const doRequestDowntime = (passProps) => {
  const { countryName, factoryName, plantName, lineName, timeZone,
    timeUnit, date, startDate, endDate } = passProps;

  // fetch url config
  const fetchApiName = ['list/equipmentsOfLine', 'get/alarm'];
  const fetchBasicInfo = `?countryName="${countryName}"`+
    `&factoryName="${factoryName}"`+
    `&plantName="${plantName}"`+
    `&lineName="${lineName}"`;
  const fetchEquipment = `${serverConfig.url}${fetchApiName[0]}${fetchBasicInfo}`;
  const fetchDowntime = `${serverConfig.url}${fetchApiName[1]}${fetchBasicInfo}&timeZone="${timeZone}"&timeUnit="${timeUnit}` +
    ( timeUnit === 'hour' ?  `&date="${date}"` : `&startDate="${startDate}"&endDate="${endDate}"` );

  return (dispatch) => {
    dispatch({
      type: types.ADMIN_DOWNTIME_CHART_REQUEST,
    })
    fetch(fetchEquipment)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      let sortedData = [];
      const multipleFetch = [];
      _.map(data.equipments, (value, key) => {
        let equipmentName = value.split('-')[0];
        let equipmentSerial = value.split('-')[1];

        multipleFetch.push(
          fetch(`${fetchDowntime}&equipmentName="${equipmentName}"&equipmentSerial="${equipmentSerial}"`)
            .then(checkStatus)
            .then(parseJSON)
            .then((downtimeData) => {
              if (_.isEmpty(downtimeData.payload)) {
                dispatch({
                  type: types.ADMIN_DOWNTIME_CHART_SUCCESS,
                  downtimeData: [],
                });
              }

              // construct downtime data
              _.map(downtimeData.payload.status, (alarmValue, alarmKey) => {
                if (alarmValue.totalAlarmTime) {
                  let rebuildObj = {};
                  _.map(alarmValue, (innerValue, innerKey) => {
                    if (innerKey === 'description') rebuildObj.description = innerValue.description.en;
                    else rebuildObj[innerKey] = innerValue;
                  });
                  rebuildObj.alarmCode = alarmKey;
                  rebuildObj.equipmentName = value;
                  sortedData.push(rebuildObj);
                }
              });

              sortedData = _.sortBy(sortedData, [(data) => { return data.count }]).reverse();
              return sortedData;
            })
        );
      });

      Promise.all(multipleFetch)
      .then(response => {
        // TODO(jasonHsu): find out the reason that response have two same array
        dispatch({
          type: types.ADMIN_DOWNTIME_CHART_SUCCESS,
          downtimeData: response[0],
        });
      })
      .catch((err) => {
        console.log('sss', err);
        dispatch({
          type: types.ADMIN_DOWNTIME_CHART_FAILURE,
          downtimeData: [],
        });
      });

    })
    .catch((err) => {
      console.log('sss', err);
      dispatch({
        type: types.ADMIN_DOWNTIME_CHART_FAILURE,
        downtimeData: [],
      });
    });
  }
}

// get world map from api
export const doRequestForWorldMap = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.WORLD_MAP_REQUEST,
      worldMapData: [],
    });
    fetch(`${serverConfig.url}geo/countries`)
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
    fetch(`${serverConfig.url}geo/factories?factory=${factory}`)
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
    fetch(`${serverConfig.url}geo/plants?factory=${factory}&plant=${plant}`)
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
