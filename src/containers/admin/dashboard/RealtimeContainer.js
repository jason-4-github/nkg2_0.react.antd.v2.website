import React, { Component } from 'react';
import { Row, Col, Card, Table } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { realtimeColumns } from './../../../constants/tableColumns';
import { wdRealTimePosition, seagateRealTimePositioin } from '../../../utils/realTimePosition';

class RealtimeContainer extends Component {
  displayRealTimeImage(realTimeData) {
    const line = this.props.params.line;
    // const { wdRealTimePosition, seagateRealTimePositioin } = this.props;
    // if (line === 'P4') return seagateRealTimePositioin([], line);
    if (line === 'CELL3') return wdRealTimePosition([], line);
    // if (line === 'P6') return seagateRealTimePositioin([], line);
    // if (typeof realTimeData === 'undefined') return '';

    const statusColors = ['white', 'yellow', 'green', 'red'];
    const statusColorsType = ['white', 'green', 'yellow', 'red'];
    const statusColorsType2 = ['white', 'green'];
    const cell2BigLightColor = ['green', 'yellow', 'red'];
    const tmpWDMachineNames = ['iICTPCB1', 'iICTPCB2', 'iICTPCB3', 'iICTPCB4', 'iNGPCB1',
      'iNGPCB2', 'iNGPCB3', 'iNGPCB4'];
      // 'iRobotPCB1', 'iRobotPCB2','iRobotPCB3', 'iRobotPCB4'];
    const divs = [];

    const isWDRobotArmAction = [false, false, false];
    const isSGRobotArmAction = [
      'rotate(180deg)', 'rotate(180deg)', 'rotate(0deg)', 'rotate(180deg)', 'rotate(0deg)',
    ];
    const isG789RobotArmAction = ['rotate(-90deg)', 'rotate(180deg)',
      'rotate(0deg)', 'rotate(180deg)', 'rotate(180deg)'];

    const machineData = line !== 'P9'
      ? ['routercv', 'buffercv', 'shiftcv', 'trcva', 'trcvb', 'icta', 'ictb']
      : ['shift', 'cv', 'ctcv', 'buffer', 'ct'];
    const machineDataCount = [7, 19, 20, 17, 20];

    // ***************************************************************
    // special case for wd lines on P6
    // 1: running 2: idle 3; alarm

    // XXX(JasonHsu): need to modify
    // ict-1 -> robot-1 -> ict-2 -> robot-2 -> router-1 -> robot-3 -> router 4個點
    const robotName = ['ict-1', 'ict-2', 'router-1', 'conveyor-1', 'conveyor-2'];
    const machineColorClass = ['greenLight', 'yellowLight', 'redLight'];
    const sensorColorClass = ['greenLight', 'noLight'];
    const p6Arrs = [];
    let isRouterRobotRotate;
    let isIct1RobotRotate;
    let isIct2RobotRotate;
    if(line === 'P6') {
      _.map(robotName, (value, key) => {
        const isConveyor = value.split('-')[0] === 'conveyor' ? true : false;
        const isRouter = value.split('-')[0] === 'router' ? true : false;

        _.map(realTimeData, (innerValue, innerKey) => {
          if (value === innerValue.equipmentName && isConveyor) {
            if (value === 'ict-1') innerValue.machineStatus = 2;
            _.map(innerValue.sensorStatus, (sensorValue, sensorKey) => {


              let smallSensorCount = 0;

              _.map(sensorValue, (smallSensor) => {
                // console.log(value, sensorValue[7], smallSensorCount)
                p6Arrs.push(sensorColorClass[smallSensor ? 0 : 1]);
                if (value === 'conveyor-1'  && sensorValue[7] === true && smallSensorCount === 7) {
                  isRouterRobotRotate = isRouterRobotRotate !== undefined ? isRouterRobotRotate : true;
                }
                if ((value === 'conveyor-2' && sensorKey === 0) && sensorValue[0] === true && smallSensorCount === 0) {
                  isIct2RobotRotate = isIct2RobotRotate !== undefined ? isIct2RobotRotate : true;
                }
                if (value === 'conveyor-2' && sensorKey === 1 && sensorValue[0] === true && smallSensorCount === 0) {
                  isIct1RobotRotate = isIct1RobotRotate !== undefined ? isIct1RobotRotate : true;
                }
                smallSensorCount += 1;
              });
            });
          } else if (value === innerValue.equipmentName && isRouter) {
            let robotMachineStatus = innerValue.robot.machineStatus;
            p6Arrs.push(machineColorClass[innerValue.machineStatus - 1]);
            p6Arrs.push(machineColorClass[robotMachineStatus - 1]);
            _.map(innerValue.sensorStatus, (sensorValue) => {
              _.map(sensorValue, (smallSensor) => {
                p6Arrs.push(sensorColorClass[smallSensor ? 0 : 1]);
              });
            });
            if (robotMachineStatus !== 1) isRouterRobotRotate = false
            // p6Arrs.push(isRouterRobotRotate);
          } else if (value === innerValue.equipmentName) {
            let robotMachineStatus = innerValue.robot.machineStatus;
            let machineStatus = innerValue.machineStatus;
            p6Arrs.push(machineColorClass[innerValue.machineStatus - 1]);
            p6Arrs.push(machineColorClass[innerValue.robot.machineStatus - 1]);
            if (robotMachineStatus !== 1 || machineStatus !== 1) {
              if (value === 'ict-1') isIct1RobotRotate = false;
              else if (value === 'ict-2') isIct2RobotRotate = false;
            }
          }

        });
      });
      p6Arrs.push(isIct1RobotRotate);
      p6Arrs.push(isIct2RobotRotate);
      p6Arrs.push(isRouterRobotRotate);
      return seagateRealTimePositioin(p6Arrs, line);
    }

    // ***************************************************************
    // special case for wd lines on G7 / G8 / G9
    if (line === 'G7' || line === 'G8' || line === 'G9') {
      if (typeof realTimeData === 'undefined') {
        _.times(37, () => {
          divs.push('gray');
        });
      } else {
        _.map(realTimeData, (value) => {
          _.map(value, (innerValue, key) => {
            const keyStr = key.substr(0, 7);
            divs.push(innerValue);

            // control ICT1 robot angle
            if (keyStr === 'iICT1_1' && (innerValue === 'green' || innerValue === 'red')) {
              isG789RobotArmAction[1] = 'rotate(65deg)';
            } else if (keyStr === 'iICT1_2' && (innerValue === 'green' || innerValue === 'red')) {
              isG789RobotArmAction[1] = 'rotate(97deg)';
            }

            // control ICT2 robot angle
            if (keyStr === 'iICT2_1' && (innerValue === 'green' || innerValue === 'red')) {
              isG789RobotArmAction[2] = 'rotate(-80deg)';
            } else if (keyStr === 'iICT2_2' && (innerValue === 'green' || innerValue === 'red')) {
              isG789RobotArmAction[2] = 'rotate(-117deg)';
            }

            // control FCT1 robot angle
            if (keyStr === 'iFCT1_1' && innerValue === 'green') {
              isG789RobotArmAction[3] = 'rotate(90deg)';
            } else if (keyStr === 'iFCT1_2' && innerValue === 'green') {
              isG789RobotArmAction[3] = 'rotate(270deg)';
            } else if (keyStr === 'iFCT1_3' && innerValue === 'green') {
              isG789RobotArmAction[3] = 'rotate(270deg)';
            }

            // control FCT2 robot angle
            if (keyStr === 'iFCT2_1' && innerValue === 'green') {
              isG789RobotArmAction[4] = 'rotate(90deg)';
            } else if (keyStr === 'iFCT2_2' && innerValue === 'green') {
              isG789RobotArmAction[4] = 'rotate(270deg)';
            } else if (keyStr === 'iFCT2_3' && innerValue === 'green') {
              isG789RobotArmAction[4] = 'rotate(270deg)';
            }
          });
        });

        _.map(isG789RobotArmAction, (value, key) => {
          divs.push(isG789RobotArmAction[key]);
        });
      }
      return wdRealTimePosition(divs, line);
      // return wdRealTimePosition([], line);
    } else if (line === 'CELL2') {
      // ***************************************************************
      // for CELL2
      if (typeof realTimeData === 'undefined') {
        _.times(7, () => {
          divs.push('gray');
        });
      } else {
        const bigLightOrder = ['vftTest', 'uppercaseassy', 'rotateassy', 'zebralabeling',
          'autoScrew', 'firmwareDownload', 'shockMount'];
        _.map(bigLightOrder, (orderName) => {
          let dataMatch = false;
          _.map(realTimeData, (value) => {
            if (value.machineName === orderName) {
              const colorStatus = value.status;
              divs.push(cell2BigLightColor[colorStatus - 1]);
              dataMatch = true;
            }
          });
          if (!dataMatch) divs.push('grey');
        });
      }
      return wdRealTimePosition(divs, line);
    } else if (line === 'P4') {
      // ***************************************************************
      // for P4
      if (typeof realTimeData === 'undefined') {
        _.times(38, () => {
          divs.push('gray');
        });
      } else {
        const bigLightOrder = ['buffercv', 'transfercv', 'ict1', 'ict1cv',
          'ict2', 'ict2cv', 'fct1', 'fct1cv', 'fct2', 'fct2cv'];
        _.map(bigLightOrder, (machineName) => {
          _.map(realTimeData, (value) => {
            if (value.machine === machineName) {
              _.map(value, (innerValue, key) => {
                if (key !== 'machine') divs.push(innerValue);
              });
            }
          });
        });
      }
      return seagateRealTimePositioin(divs, line);
    }

    // ***************************************************************
    // GA / GB / GC / G5 / G6  and  sg-L2(p9)
    _.map(machineData, (value, key) => {
      // find the ordered machine name's object
      const obj = _.find(realTimeData, ['machine', value]);
      if (obj !== undefined) {
        if (line === 'P9') {
          // P9's realtme data trans to color style
          _.map(obj, (innerValue, innerKey) => {
            if (innerKey === 'machine') return;
            if (obj.machine === 'ct') {
              const separateStr = innerKey.split('_');

              if (separateStr.length !== 3 && statusColorsType[innerValue]) {
                divs.push(statusColorsType[innerValue]);
              } else if (statusColors[innerValue]) {
                divs.push(statusColors[innerValue]);
              } else divs.push('red');

              if (separateStr[0] === 'iICT2' && innerValue === 2) {
                if (separateStr[1] === 'PCB1') isSGRobotArmAction[1] = 'rotate(25deg)';
                if (separateStr[1] === 'PCB2') isSGRobotArmAction[1] = 'rotate(0deg)';
              } else if (separateStr[0] === 'iICT1' && innerValue === 2) {
                if (separateStr[1] === 'PCB1') isSGRobotArmAction[2] = 'rotate(175deg)';
                if (separateStr[1] === 'PCB2') isSGRobotArmAction[2] = 'rotate(205deg)';
              } else if (separateStr[0] === 'iFCT2' && innerValue === 2) {
                if (separateStr[1] === 'PCB1') isSGRobotArmAction[3] = 'rotate(80deg)';
                if (separateStr[1] === 'PCB2') isSGRobotArmAction[3] = 'rotate(40deg)';
                if (separateStr[1] === 'PCB3') isSGRobotArmAction[3] = 'rotate(10deg)';
                if (separateStr[1] === 'PCB4') isSGRobotArmAction[3] = 'rotate(-20deg)';
                if (separateStr[1] === 'PCB5') isSGRobotArmAction[3] = 'rotate(-60deg)';
                if (separateStr[1] === 'PCB6') isSGRobotArmAction[3] = 'rotate(-95deg)';
              } else if (separateStr[0] === 'iFCT1' && innerValue === 2) {
                if (separateStr[1] === 'PCB1') isSGRobotArmAction[4] = 'rotate(105deg)';
                if (separateStr[1] === 'PCB2') isSGRobotArmAction[4] = 'rotate(150deg)';
                if (separateStr[1] === 'PCB3') isSGRobotArmAction[4] = 'rotate(180deg)';
                if (separateStr[1] === 'PCB4') isSGRobotArmAction[4] = 'rotate(205deg)';
                if (separateStr[1] === 'PCB5') isSGRobotArmAction[4] = 'rotate(250deg)';
                if (separateStr[1] === 'PCB6') isSGRobotArmAction[4] = 'rotate(285deg)';
              }
            } else {
              const separateStr = innerKey.split('_');
              if (separateStr[1] === 'status') {
                divs.push(statusColorsType[innerValue]);
              } else {
                divs.push(statusColorsType2[innerValue]);
                if (separateStr[0] === 'bCV1' && innerValue === 1) {
                  if (separateStr[1] === 'out') isSGRobotArmAction[0] = 'rotate(90deg)';
                }
                if (separateStr[0] === 'bCV2' && innerValue === 1) {
                  if (separateStr[1] === 'in') isSGRobotArmAction[0] = 'rotate(270deg)';
                }
              }
            }
          });
        } else {
          // wd's realtime data trans to color style
          // first-check: machine connect status
          if (obj.bGreen === 1) divs.push(statusColors[2]);
          else if (obj.bRed === 1) divs.push(statusColors[3]);
          else divs.push(statusColors[1]);
          // else divs.push(statusColors[0]);

          // second-check: PCB or not
          if (obj.bPCB === 0) divs.push(statusColorsType2[0]);
          else if (obj.bPCB === 1) {
            divs.push(statusColorsType2[1]);
            if (obj.machine === 'trcva') {
              isWDRobotArmAction[1] = true;
            } else {
              isWDRobotArmAction[2] = true;
            }
          }

          // third-check: show arrow or not
          if (obj.bCV_moto === 0) divs.push('none');
          else if (obj.bCV_moto === 1) {
            divs.push('block');
            if (obj.machine === 'routercv') {
              isWDRobotArmAction[0] = true;
            }
          }

          if (obj.bCV1_moto === 0) divs.push('none');
          else if (obj.bCV1_moto === 1) divs.push('block');

          if (obj.bCV2_moto === 0) divs.push('none');
          else if (obj.bCV2_moto === 1) divs.push('block');

          // fourth-check: small cube active
          _.map(tmpWDMachineNames, (name) => {
            const colorNum = obj[name];
            if (colorNum === undefined) return;
            divs.push(statusColors[colorNum] ? statusColors[colorNum] : 'red');
          });
        }
      } else if (line === 'P4' || line === 'P9') {
        _.times(machineDataCount[key], () => {
          divs.push('gray');
        });
      } else {
        _.times(32, () => {
          divs.push('gray');
        });
      }
    });
    divs.push(line === 'P9' ? isSGRobotArmAction : isWDRobotArmAction);
    return (
      <div>
        { line !== 'P9'
      ? wdRealTimePosition(divs)
      : seagateRealTimePositioin(divs, line) }
      </div>
    );
  }
  generateTableDataSource(data) {
    const dataAnalysis = [];
    _.map(data, (value, key) => {
      _.map(value.errorCodes, (errorValue) => {
        let dataObj = {};
        dataObj.machineName = value.equipmentName;
        dataObj.errorCode = errorValue.errorCode;
        dataObj.errorDescription = errorValue.description.en;
        dataAnalysis.push(dataObj);
      });
      if (value.robot) {
        _.map(value.robot.errorCodes, (robotErrorValue) => {
          let dataObj = {};
          dataObj.machineName = value.robot.robotName;
          dataObj.errorCode = robotErrorValue.errorCode;
          dataObj.errorDescription = robotErrorValue.description.en;
          dataAnalysis.push(dataObj);
        });
      }
    });
    const arr = [];
    _.map(dataAnalysis, (d, idx) => {
      arr.push({
        key: idx,
        no: idx + 1,
        machineName: d.machineName,
        errorCode: d.errorCode,
        errorDescription: d.errorDescription,
      });
    });

    return arr;
  }
  render() {
    const { socketData } = this.props;
    const line = this.props.params.line;
    const noDataLines = ['P4', 'G7', 'G8', 'G9', 'CELL2', 'CELL3'];
    return (
      <div id="realtime-container">
        <Row>
          <Col span={24} className="col">
            <Card>
              {this.displayRealTimeImage(socketData)}
              { typeof socketData === 'undefined'
                ? <div
                  className="noDataCoverDiv"
                  style={{ width: _.indexOf(noDataLines, line) !== -1 ? '900px' : '800px' }}
                >
                  <h1 className="noDataWords">
                    { _.indexOf(noDataLines, line) !== -1 ? ' No data' : 'offline' }
                  </h1>
                </div>
                : ''
              }
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(socketData)}
                columns={realtimeColumns}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

RealtimeContainer.propTypes = {
  params: PropTypes.object,
  type: PropTypes.string,
  socketData: PropTypes.array,
};

export default RealtimeContainer;
