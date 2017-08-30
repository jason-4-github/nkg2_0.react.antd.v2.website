import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';

export const wdRealTimePosition = (divs, line) => {
  const robotArm1 = ['rotate(0deg)', 'rotate(-66deg)'];
  const robotArm2 = ['rotate(-90deg)', 'rotate(0deg)'];
  const robotArm3 = ['rotate(90deg)', 'rotate(0deg)'];

  if (line === 'CELL2') {
    return (
      <div>
        <img
          alt=""
          width={line === 'CELL2' ? '900px' : '600px'}
          height={line === 'CELL2' ? '500px' : '400px'}
          src="/images/cellAuto2.jpg"
        />
        <div
          id="vfttest"
          style={{
            position: 'absolute',
            width: '70px',
            backgroundColor: divs[0],
            border: 'groove',
            color: 'black',
            top: '66px',
            left: '678px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          VFT Test
        </div>
        <div
          id="uppercaseassy"
          style={{
            position: 'absolute',
            width: '95px',
            backgroundColor: divs[1],
            border: 'groove',
            color: 'black',
            top: '215px',
            left: '575px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Upper Case
        </div>
        <div
          id="rotateassy"
          style={{
            position: 'absolute',
            width: '60px',
            backgroundColor: divs[2],
            border: 'groove',
            color: 'black',
            top: '105px',
            left: '488px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Rotate
        </div>
        <div
          id="zebralabeling"
          style={{
            position: 'absolute',
            width: '60px',
            backgroundColor: divs[3],
            border: 'groove',
            color: 'black',
            top: '255px',
            left: '400px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Zebra
        </div>
        <div
          id="autoscrew"
          style={{
            position: 'absolute',
            width: '90px',
            backgroundColor: divs[4],
            border: 'groove',
            color: 'black',
            top: '430px',
            left: '250px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Auto Screw
        </div>
        <div
          id="firmwaredownload"
          style={{
            position: 'absolute',
            width: '77px',
            backgroundColor: divs[5],
            border: 'groove',
            color: 'black',
            top: '150px',
            left: '100px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Firmware
        </div>
        <div
          id="shockmount"
          style={{
            position: 'absolute',
            width: '102px',
            backgroundColor: divs[6],
            border: 'groove',
            color: 'black',
            top: '450px',
            left: '100px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Shock Mount
        </div>
      </div>
    );
  }
  if (line === 'CELL3') {
    return (
      <div>
        <img
          alt=""
          width={line === 'CELL2' ? '900px' : '600px'}
          height={line === 'CELL2' ? '500px' : '400px'}
          src="/images/cellAuto3.png"
        />
      </div>
    );
  }
  if (line === 'G7' || line === 'G8' || line === 'G9') {
    return (
      <div>
        <img
          alt=""
          width="900px"
          height="300px"
          src="/images/G8Layout.png"
        />
        <div
          id="router"
          style={{
            position: 'absolute',
            width: '65px',
            backgroundColor: divs[0],
            border: 'groove',
            color: 'black',
            top: '60px',
            left: '819px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Router
        </div>
        <div
          id="ICT1"
          style={{
            position: 'absolute',
            width: '50px',
            backgroundColor: divs[1],
            border: 'groove',
            color: 'black',
            top: '86px',
            left: '659px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT1
        </div>
        <div
          id="ICT2"
          style={{
            position: 'absolute',
            width: '50px',
            backgroundColor: divs[2],
            border: 'groove',
            color: 'black',
            top: '291px',
            left: '545px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT2
        </div>
        <div
          id="FCT1"
          style={{
            position: 'absolute',
            width: '50px',
            backgroundColor: divs[3],
            border: 'groove',
            color: 'black',
            top: '241px',
            left: '355px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT1
        </div>
        <div
          id="FCT2"
          style={{
            position: 'absolute',
            width: '50px',
            backgroundColor: divs[4],
            border: 'groove',
            color: 'black',
            top: '241px',
            left: '177px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT2
        </div>
        <div
          id="iICT1_1_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[5],
            border: 'groove',
            top: '120px',
            left: '619px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT1_1_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[6],
            border: 'groove',
            top: '120px',
            left: '602px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT1_2_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[7],
            border: 'groove',
            top: '147px',
            left: '619px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT1_2_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[8],
            border: 'groove',
            top: '147px',
            left: '602px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT2_1_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[9],
            border: 'groove',
            top: '240px',
            left: '635px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT2_1_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[10],
            border: 'groove',
            top: '240px',
            left: '618px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT2_2_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[11],
            border: 'groove',
            top: '267px',
            left: '635px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iICT2_2_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[12],
            border: 'groove',
            top: '267px',
            left: '618px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_1_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[13],
            border: 'groove',
            top: '115px',
            left: '410px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_1_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[14],
            border: 'groove',
            top: '129px',
            left: '410px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_1_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[15],
            border: 'groove',
            top: '144px',
            left: '410px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_1_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[16],
            border: 'groove',
            top: '157px',
            left: '410px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_2_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[17],
            border: 'groove',
            top: '115px',
            left: '338px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_2_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[18],
            border: 'groove',
            top: '129px',
            left: '338px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_2_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[19],
            border: 'groove',
            top: '144px',
            left: '338px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_2_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[20],
            border: 'groove',
            top: '157px',
            left: '338px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_3_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[21],
            border: 'groove',
            top: '115px',
            left: '321px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_3_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[22],
            border: 'groove',
            top: '129px',
            left: '321px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_3_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[23],
            border: 'groove',
            top: '144px',
            left: '321px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT1_3_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[24],
            border: 'groove',
            top: '157px',
            left: '321px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_1_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[25],
            border: 'groove',
            top: '115px',
            left: '230px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_1_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[26],
            border: 'groove',
            top: '129px',
            left: '230px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_1_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[27],
            border: 'groove',
            top: '144px',
            left: '230px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_1_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[28],
            border: 'groove',
            top: '157px',
            left: '230px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_2_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[29],
            border: 'groove',
            top: '115px',
            left: '158px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_2_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[30],
            border: 'groove',
            top: '129px',
            left: '158px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_2_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[31],
            border: 'groove',
            top: '144px',
            left: '158px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_2_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[32],
            border: 'groove',
            top: '157px',
            left: '158px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_3_1Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[33],
            border: 'groove',
            top: '115px',
            left: '141px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_3_2Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[34],
            border: 'groove',
            top: '129px',
            left: '141px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_3_3Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[35],
            border: 'groove',
            top: '144px',
            left: '141px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="iFCT2_3_4Mem"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[36],
            border: 'groove',
            top: '157px',
            left: '141px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <img
          alt=""
          id="routerRobot"
          style={{
            position: 'absolute',
            top: '139px',
            left: '850px',
            width: '40px',
            height: '70px',
            zIndex: '4',
            transform: divs[37],
            transformOrigin: 'bottom',
            transition: 'transform 1s',
          }}
          src="/images/robot_fct.png"
        />
        <img
          alt=""
          id="ICT1robot"
          style={{
            position: 'absolute',
            top: '95px',
            left: '539px',
            width: '35px',
            height: '55px',
            zIndex: '5',
            transform: divs[38],
            transformOrigin: 'bottom',
            transition: 'transform 1s',
          }}
          src="/images/robot_ict.png"
        />
        <img
          alt=""
          id="ICT2robot"
          style={{
            position: 'absolute',
            top: '198px',
            left: '675px',
            width: '35px',
            height: '55px',
            zIndex: '5',
            transform: divs[39],
            transformOrigin: 'bottom',
            transition: 'transform 1s',
          }}
          src="/images/robot_ict.png"
        />
        <img
          alt=""
          id="FCT1robot"
          style={{
            position: 'absolute',
            top: '85px',
            left: '339px',
            width: '70px',
            height: '70px',
            zIndex: '5',
            transform: divs[40],
            transformOrigin: 'bottom',
            transition: 'transform 1s',
          }}
          src="/images/fctRobot.png"
        />
        <img
          alt=""
          id="ICT2robot"
          style={{
            position: 'absolute',
            top: '85px',
            left: '158px',
            width: '70px',
            height: '70px',
            zIndex: '5',
            transform: divs[41],
            transformOrigin: 'bottom',
            transition: 'transform 1s',
          }}
          src="/images/fctRobot.png"
        />
      </div>
    );
  }
  return (
    <div>
      <img
        alt=""
        width="800px"
        height="450px"
        src="/images/layout.png"
      />
      <div
        id="routerrcv"
        style={{
          position: 'absolute',
          width: '75px',
          backgroundColor: divs[0],
          border: 'groove',
          color: 'black',
          top: '275px',
          left: '542px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Router CV
      </div>
      <Icon
        id="routerArrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '224px',
          left: '555px',
          display: divs[1],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <div
        id="buffercv"
        style={{
          position: 'absolute',
          width: '72px',
          backgroundColor: divs[2],
          border: 'groove',
          color: 'black',
          top: '289px',
          left: '468px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Buffer CV
      </div>
      <Icon
        id="buffer1Arrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '227px',
          left: '502px',
          display: divs[3],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <Icon
        id="buffer2Arrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '227px',
          left: '465px',
          display: divs[4],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <div
        id="shiftcv"
        style={{
          position: 'absolute',
          width: '87px',
          backgroundColor: divs[5],
          color: 'black',
          border: 'groove',
          top: '371px',
          left: '400px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Transfer CV
      </div>
      <Icon
        id="tansfer1Arrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '192px',
          left: '415px',
          display: divs[6],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <Icon
        id="tansfer2Arrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '255px',
          left: '415px',
          display: divs[7],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <div
        id="trcva"
        style={{
          position: 'absolute',
          width: '61px',
          backgroundColor: divs[8],
          color: 'black',
          border: 'groove',
          top: '163px',
          left: '350px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT1 CV
      </div>
      <div
        id="ICT1CV1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[9],
          border: 'groove',
          top: '225px',
          left: '349px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1CV2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[9],
          border: 'groove',
          top: '225px',
          left: '331px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <Icon
        id="ICT1CVArrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '210px',
          left: '370px',
          display: divs[10],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <div
        id="trcvb"
        style={{
          position: 'absolute',
          width: '61px',
          backgroundColor: divs[11],
          border: 'groove',
          color: 'black',
          top: '336px',
          left: '350px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT2 CV
      </div>
      <div
        id="ICT2CV1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[12],
          border: 'groove',
          top: '285px',
          left: '331px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2CV2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[12],
          border: 'groove',
          top: '285px',
          left: '349px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <Icon
        id="ICT2CVArrow"
        type="backward"
        style={{
          position: 'absolute',
          color: '#d46b0c',
          top: '275px',
          left: '370px',
          display: divs[13],
          fontSize: '34px',
          zIndex: '5',
        }}
      />
      <div
        id="icta"
        style={{
          position: 'absolute',
          width: '56px',
          backgroundColor: divs[14],
          border: 'groove',
          color: 'black',
          top: '54px',
          left: '264px',
          paddingLeft: '10px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT1
      </div>
      <div
        id="ICTA1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[15],
          border: 'groove',
          top: '150px',
          left: '297px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTA2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[16],
          border: 'groove',
          top: '165px',
          left: '297px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTA3"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[17],
          border: 'groove',
          top: '165px',
          left: '270px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTA4"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[18],
          border: 'groove',
          top: '150px',
          left: '270px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTANG1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[19],
          border: 'groove',
          top: '175px',
          left: '247px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTANG2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[20],
          border: 'groove',
          top: '158px',
          left: '247px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTANG3"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[21],
          border: 'groove',
          top: '141px',
          left: '247px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTANG4"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[22],
          border: 'groove',
          top: '124px',
          left: '247px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ictb"
        style={{
          position: 'absolute',
          width: '56px',
          backgroundColor: divs[23],
          border: 'groove',
          color: 'black',
          top: '446px',
          left: '264px',
          paddingLeft: '10px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT2
      </div>
      <div
        id="ICTB1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[24],
          border: 'groove',
          top: '345px',
          left: '270px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTB2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[25],
          border: 'groove',
          top: '360px',
          left: '270px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTB3"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[26],
          border: 'groove',
          top: '345px',
          left: '297px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTB4"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[27],
          border: 'groove',
          top: '360px',
          left: '297px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTBNG1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[28],
          border: 'groove',
          top: '335px',
          left: '320px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTBNG2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[29],
          border: 'groove',
          top: '352px',
          left: '320px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTBNG3"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[30],
          border: 'groove',
          top: '369px',
          left: '320px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICTBNG4"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[31],
          border: 'groove',
          top: '386px',
          left: '320px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <img
        alt=""
        id="routerRobot"
        style={{
          position: 'absolute',
          top: '173px',
          left: '641px',
          width: '42px',
          height: '100px',
          zIndex: '4',
          transform: divs[32][0] ? robotArm1[1] : robotArm1[0],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot1.png"
      />
      <img
        alt=""
        id="ICT1robot"
        style={{
          position: 'absolute',
          top: '205px',
          left: '291px',
          width: '78px',
          height: '30px',
          zIndex: '4',
          transform: divs[32][1] ? robotArm2[1] : robotArm2[0],
          transformOrigin: 'left',
          transition: 'transform 1s',
        }}
        src="/images/robot2.png"
      />
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '291px',
          left: '292px',
          width: '78px',
          height: '30px',
          zIndex: '4',
          transform: divs[32][2] ? robotArm3[1] : robotArm3[0],
          transformOrigin: 'left',
          transition: 'transform 1s',
        }}
        src="/images/robot2.png"
      />
    </div>
  );
};

export const seagateRealTimePositioin = (divs, line) => {
  if (line === 'P6') {
    const routerRobotClassName = ['robotNoMove', 'robotUpToRight'];
    const ict1RobotClassName = ['robotNoMove', 'robotUpToDownReverse'];
    const ict2RobotClassName = ['robotNoMove', 'robotUpToDown'];
    // conveyor:  left -> right => 1 -> 2
    // sensor: left -> right => 7 -> 0    up -> down => 1 -> 0
    const conveyor = [];
    const conveyor1Machine = ['conveyor1_0', 'conveyor1_1', 'conveyor2_0', 'conveyor2_1'];
    const conveyorHeight = ['315px', '260px'];
    const conveyorWidth = [524, 670];
    const conveyorTimesCount = [8, 7];
    let sensorCount = 0;

    _.map(conveyor1Machine, (value, index) => {
      const machineCount2Index = index < 2 ? 0 : 1;
      _.times(conveyorTimesCount[machineCount2Index], (key) => {
        sensorCount += 1;
        conveyor.push(
          <div
            className={divs[9 + sensorCount] || 'noLight'}
            key={value+key}
            style={{
              top: conveyorHeight[index % 2],
              left: (conveyorWidth[machineCount2Index] - (key * 20)) + 'px',
              borderRadius: '25px',
              width: '10px',
              height: '10px',
            }}
          />
        );
      })
    });
    return (
      <div>
        <img
          alt=""
          width="825px"
          height="464px"
          src="/images/p6Layout.png"
        />
        <div
          className={divs[0] || 'noLight'}
          style={{
            top: '140px',
            left: '740px',
            borderRadius: '25px',
          }}
        >
          ICT1
        </div>
        <div
          className={divs[1] || 'noLight'}
          style={{
            top: '220px',
            left: '687px',
            borderRadius: '25px',
          }}
        >
          robot1
        </div>
        <div
          className={divs[2] || 'noLight'}
          style={{
            top: '410px',
            left: '706px',
            borderRadius: '25px',
          }}
        >
          ICT2
        </div>
        <div
          className={divs[3] || 'noLight'}
          style={{
            top: '323px',
            left: '687px',
            borderRadius: '25px',
          }}
        >
          robot2
        </div>
        <div
          className={divs[4] || 'noLight'}
          style={{
            top: '130px',
            left: '333px',
            borderRadius: '25px',
          }}
        >
          Router
        </div>
        <div
          className={divs[5] || 'noLight'}
          style={{
            top: '313px',
            left: '306px',
            borderRadius: '25px',
          }}
        >
          robot3
        </div>
        <div
          className={divs[6] || 'noLight'}
          style={{
            top: '218px',
            left: '331px',
            borderRadius: '25px',
            width: '10px',
            height: '10px',
          }}
        />
        <div
          className={divs[7] || 'noLight'}
          style={{
            top: '235px',
            left: '331px',
            borderRadius: '25px',
            width: '10px',
            height: '10px',
          }}
        />
        <div
          className={divs[8] || 'noLight'}
          style={{
            top: '218px',
            left: '369px',
            borderRadius: '25px',
            width: '10px',
            height: '10px',
          }}
        />
        <div
          className={divs[9] || 'noLight'}
          style={{
            top: '235px',
            left: '369px',
            borderRadius: '25px',
            width: '10px',
            height: '10px',
          }}
        />
        {conveyor}
        <img
          alt=""
          className={ict1RobotClassName[divs[40] ? 1 : 0]}
          style={{
            top: "173px",
            left: "629px",
            position: "absolute",
          }}
          src="/images/p6Robot.png"
        />
        <img
          alt=""
          className={ict2RobotClassName[divs[41] ? 1 : 0]}
          style={{
            top: "289px",
            left: "629px",
            position: 'absolute',
          }}
          src="/images/p6Robot.png"
        />
        <img
          alt=""
          className={routerRobotClassName[divs[42] ? 1 : 0]}
          style={{
            top: "226px",
            left: "341px",
            position: 'absolute',
          }}
          src="/images/p6Robot.png"
        />
      </div>
    );
  } else if (line === 'P4') {
    return (
      <div>
        <img
          alt=""
          width="900px"
          height="352px"
          src="/images/seagate-line1.png"
        />
        <div
          id="buffercv"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[0],
            border: 'groove',
            color: 'black',
            top: '150px',
            left: '445px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Buffer
        </div>
        <div
          id="buffercv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[1],
            border: 'groove',
            top: '240px',
            left: '500px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="buffercv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[2],
            border: 'groove',
            top: '240px',
            left: '481px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="buffercv2"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[3],
            border: 'groove',
            top: '240px',
            left: '462px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="buffercv3"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[4],
            border: 'groove',
            top: '240px',
            left: '443px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="transfercv"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[5],
            border: 'groove',
            color: 'black',
            top: '270px',
            left: '396px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          Transfer
        </div>
        <div
          id="transfercv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[6],
            border: 'groove',
            top: '171px',
            left: '405px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="transfercv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[7],
            border: 'groove',
            top: '199px',
            left: '405px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict1"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[8],
            border: 'groove',
            color: 'black',
            top: '41px',
            left: '292px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT1
        </div>
        <div
          id="ict10"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[9],
            border: 'groove',
            top: '106px',
            left: '305px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict11"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[10],
            border: 'groove',
            top: '126px',
            left: '305px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict1cv"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[11],
            border: 'groove',
            color: 'black',
            top: '66px',
            left: '292px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT1 CV
        </div>
        <div
          id="ict1cv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[12],
            border: 'groove',
            top: '169px',
            left: '378px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict1cv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[13],
            border: 'groove',
            top: '182px',
            left: '360px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict2"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[14],
            border: 'groove',
            color: 'black',
            top: '347px',
            left: '335px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT2
        </div>
        <div
          id="ict20"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[15],
            border: 'groove',
            top: '270px',
            left: '363px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict21"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[16],
            border: 'groove',
            top: '291px',
            left: '363px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict2cv"
          style={{
            position: 'absolute',
            width: '63px',
            backgroundColor: divs[17],
            border: 'groove',
            color: 'black',
            top: '323px',
            left: '335px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          ICT2 CV
        </div>
        <div
          id="ict2cv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[18],
            border: 'groove',
            top: '228px',
            left: '350px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="ict2cv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[19],
            border: 'groove',
            top: '216px',
            left: '330px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct1"
          style={{
            position: 'absolute',
            width: '70px',
            backgroundColor: divs[20],
            border: 'groove',
            color: 'black',
            top: '35px',
            left: '92px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT1
        </div>
        <div
          id="fct10"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[21],
            border: 'groove',
            top: '66px',
            left: '253px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct11"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[22],
            border: 'groove',
            top: '68px',
            left: '220px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct12"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[23],
            border: 'groove',
            top: '82px',
            left: '190px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct13"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[24],
            border: 'groove',
            top: '107px',
            left: '170px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct14"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[25],
            border: 'groove',
            top: '140px',
            left: '162px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct1cv"
          style={{
            position: 'absolute',
            width: '70px',
            backgroundColor: divs[26],
            border: 'groove',
            color: 'black',
            top: '61px',
            left: '92px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT1 CV
        </div>
        <div
          id="fct1cv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[27],
            border: 'groove',
            top: '169px',
            left: '242px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct1cv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[28],
            border: 'groove',
            top: '182px',
            left: '220px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct2"
          style={{
            position: 'absolute',
            width: '70px',
            backgroundColor: divs[29],
            border: 'groove',
            color: 'black',
            top: '349px',
            left: '92px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT2
        </div>
        <div
          id="fct20"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[30],
            border: 'groove',
            top: '333px',
            left: '253px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct21"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[31],
            border: 'groove',
            top: '330px',
            left: '221px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct22"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[32],
            border: 'groove',
            top: '315px',
            left: '193px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct23"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[33],
            border: 'groove',
            top: '292px',
            left: '170px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct24"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[34],
            border: 'groove',
            top: '259px',
            left: '162px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct2cv"
          style={{
            position: 'absolute',
            width: '70px',
            backgroundColor: divs[35],
            border: 'groove',
            color: 'black',
            top: '325px',
            left: '92px',
            fontSize: '14px',
            zIndex: '5',
            textAlign: 'center',
          }}
        >
          FCT2 CV
        </div>
        <div
          id="fct2cv0"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[36],
            border: 'groove',
            top: '228px',
            left: '242px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
        <div
          id="fct2cv1"
          style={{
            position: 'absolute',
            width: '12px',
            backgroundColor: divs[37],
            border: 'groove',
            top: '216px',
            left: '220px',
            paddingLeft: '10px',
            paddingTop: '10px',
            zIndex: '5',
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <img
        alt=""
        width="800px"
        height="450px"
        src="/images/SGL2_Layout.png"
      />
      <div
        id="TRANSFER"
        style={{
          position: 'absolute',
          width: '63px',
          backgroundColor: divs[0],
          border: 'groove',
          color: 'black',
          top: '130px',
          left: '430px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Transfer
      </div>
      <div
        id="TRANSFERT1In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[1],
          border: 'groove',
          top: '270px',
          left: '466px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="TRANSFERT1Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[2],
          border: 'groove',
          top: '270px',
          left: '452px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="TRANSFERT1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[3],
          border: 'groove',
          top: '270px',
          left: '438px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="TRANSFERT2In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[4],
          border: 'groove',
          top: '192px',
          left: '466px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="TRANSFERT2Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[5],
          border: 'groove',
          top: '192px',
          left: '452px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="TRANSFERT2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[6],
          border: 'groove',
          top: '192px',
          left: '438px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV1In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[7],
          border: 'groove',
          top: '235px',
          left: '750px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV1Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[8],
          border: 'groove',
          top: '235px',
          left: '736px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[9],
          border: 'groove',
          top: '235px',
          left: '722px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV2In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[10],
          border: 'groove',
          top: '235px',
          left: '662px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV2P1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[11],
          border: 'groove',
          top: '235px',
          left: '648px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV2P2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[12],
          border: 'groove',
          top: '235px',
          left: '634px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[13],
          border: 'groove',
          top: '235px',
          left: '620px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV3In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[14],
          border: 'groove',
          top: '260px',
          left: '420px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV3Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[15],
          border: 'groove',
          top: '260px',
          left: '405px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV3Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[16],
          border: 'groove',
          top: '260px',
          left: '390px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV4In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[17],
          border: 'groove',
          top: '260px',
          left: '267px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV4Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[18],
          border: 'groove',
          top: '260px',
          left: '252px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV4Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[19],
          border: 'groove',
          top: '260px',
          left: '237px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV5In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[20],
          border: 'groove',
          top: '200px',
          left: '420px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV5Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[21],
          border: 'groove',
          top: '200px',
          left: '405px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV5Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[22],
          border: 'groove',
          top: '200px',
          left: '390px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV6In"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[23],
          border: 'groove',
          top: '200px',
          left: '267px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV6Mid"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[24],
          border: 'groove',
          top: '200px',
          left: '252px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="CVBCV6Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[25],
          border: 'groove',
          top: '200px',
          left: '237px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1CV"
        style={{
          position: 'absolute',
          width: '61px',
          backgroundColor: divs[26],
          border: 'groove',
          color: 'black',
          top: '425px',
          left: '271px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT1 CV
      </div>
      <div
        id="ICT2CV"
        style={{
          position: 'absolute',
          width: '61px',
          backgroundColor: divs[27],
          border: 'groove',
          color: 'black',
          top: '35px',
          left: '284px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT2 CV
      </div>
      <div
        id="FCT1CV"
        style={{
          position: 'absolute',
          width: '64px',
          backgroundColor: divs[28],
          border: 'groove',
          color: 'black',
          top: '425px',
          left: '86px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        FCT1 CV
      </div>
      <div
        id="FCT2CV"
        style={{
          position: 'absolute',
          width: '64px',
          backgroundColor: divs[29],
          border: 'groove',
          color: 'black',
          top: '35px',
          left: '86px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        FCT2 CV
      </div>
      <div
        id="ICT1CVIn"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[30],
          border: 'groove',
          top: '260px',
          left: '373px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1CVP1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[31],
          border: 'groove',
          top: '260px',
          left: '359px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1CVP2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[32],
          border: 'groove',
          top: '260px',
          left: '345px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1CVOut"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[33],
          border: 'groove',
          top: '260px',
          left: '331px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2CVIn"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[34],
          border: 'groove',
          top: '200px',
          left: '373px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2CVP1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[35],
          border: 'groove',
          top: '200px',
          left: '359px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2CVP2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[36],
          border: 'groove',
          top: '200px',
          left: '345px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2CVOut"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[37],
          border: 'groove',
          top: '200px',
          left: '331px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1CVIn"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[38],
          border: 'groove',
          top: '260px',
          left: '219px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1CVP1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[39],
          border: 'groove',
          top: '260px',
          left: '205px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1CVP2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[40],
          border: 'groove',
          top: '260px',
          left: '191px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1CVOut"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[41],
          border: 'groove',
          top: '260px',
          left: '177px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2CVIn"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[42],
          border: 'groove',
          top: '200px',
          left: '219px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2CVP1"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[43],
          border: 'groove',
          top: '200px',
          left: '205px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2CVP2"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[44],
          border: 'groove',
          top: '200px',
          left: '191px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2CVOut"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[45],
          border: 'groove',
          top: '200px',
          left: '177px',
          paddingLeft: '8px',
          paddingTop: '8px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER"
        style={{
          position: 'absolute',
          width: '49px',
          backgroundColor: divs[46],
          border: 'groove',
          color: 'black',
          top: '175px',
          left: '485px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Buffer
      </div>
      <div
        id="BUFFERPIn"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[47],
          border: 'groove',
          top: '230px',
          left: '525px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFERP1"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[48],
          border: 'groove',
          top: '230px',
          left: '514px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFERP2"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[49],
          border: 'groove',
          top: '230px',
          left: '502px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFEROut"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[50],
          border: 'groove',
          top: '230px',
          left: '469px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER1"
        style={{
          position: 'absolute',
          width: '60px',
          backgroundColor: divs[51],
          border: 'groove',
          color: 'black',
          top: '300px',
          left: '266px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Buffer 1
      </div>
      <div
        id="BUFFER1In"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[52],
          border: 'groove',
          top: '260px',
          left: '319px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER1P1"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[53],
          border: 'groove',
          top: '260px',
          left: '307px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER1P2"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[54],
          border: 'groove',
          top: '260px',
          left: '295px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER1Out"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[55],
          border: 'groove',
          top: '260px',
          left: '283px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER2"
        style={{
          position: 'absolute',
          width: '60px',
          backgroundColor: divs[56],
          border: 'groove',
          color: 'black',
          top: '145px',
          left: '266px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Buffer 2
      </div>
      <div
        id="BUFFER2In"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[57],
          border: 'groove',
          top: '205px',
          left: '319px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER2P1"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[58],
          border: 'groove',
          top: '205px',
          left: '307px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER2P2"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[59],
          border: 'groove',
          top: '205px',
          left: '295px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFER2Out"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[60],
          border: 'groove',
          top: '205px',
          left: '283px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFERP3"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[61],
          border: 'groove',
          top: '230px',
          left: '491px',
          zIndex: '5',
        }}
      />
      <div
        id="BUFFERP4"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: divs[62],
          border: 'groove',
          top: '230px',
          left: '480px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1"
        style={{
          position: 'absolute',
          width: '37px',
          backgroundColor: divs[63],
          border: 'groove',
          color: 'black',
          top: '400px',
          left: '284px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT1
      </div>
      <div
        id="ICT2"
        style={{
          position: 'absolute',
          width: '37px',
          backgroundColor: divs[64],
          border: 'groove',
          color: 'black',
          top: '60px',
          left: '295px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        ICT2
      </div>
      <div
        id="FCT1"
        style={{
          position: 'absolute',
          width: '40px',
          backgroundColor: divs[65],
          border: 'groove',
          color: 'black',
          top: '400px',
          left: '100px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        FCT1
      </div>
      <div
        id="FCT2"
        style={{
          position: 'absolute',
          width: '40px',
          backgroundColor: divs[66],
          border: 'groove',
          color: 'black',
          top: '60px',
          left: '100px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        FCT2
      </div>
      <div
        id="ICT1PCB1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[67],
          border: 'groove',
          top: '356px',
          left: '371px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT1PCB2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[68],
          border: 'groove',
          top: '356px',
          left: '349px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2PCB1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[69],
          border: 'groove',
          top: '100px',
          left: '375px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="ICT2PCB2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[70],
          border: 'groove',
          top: '100px',
          left: '353px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PCB1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[71],
          border: 'groove',
          top: '323px',
          left: '234px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PCB2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[72],
          border: 'groove',
          top: '364px',
          left: '211px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PC31Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[73],
          border: 'groove',
          top: '364px',
          left: '184px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PCB4Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[74],
          border: 'groove',
          top: '364px',
          left: '159px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PCB5Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[75],
          border: 'groove',
          top: '336px',
          left: '127px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT1PCB6Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[76],
          border: 'groove',
          top: '303px',
          left: '127px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PCB1Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[77],
          border: 'groove',
          top: '136px',
          left: '234px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PCB2Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[78],
          border: 'groove',
          top: '95px',
          left: '211px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PC31Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[79],
          border: 'groove',
          top: '95px',
          left: '184px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PCB4Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[80],
          border: 'groove',
          top: '95px',
          left: '158px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PCB5Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[81],
          border: 'groove',
          top: '120px',
          left: '127px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="FCT2PCB6Out"
        style={{
          position: 'absolute',
          width: '12px',
          backgroundColor: divs[82],
          border: 'groove',
          top: '155px',
          left: '127px',
          paddingLeft: '10px',
          paddingTop: '10px',
          zIndex: '5',
        }}
      />
      <div
        id="router"
        style={{
          position: 'absolute',
          width: '52px',
          backgroundColor: 'white',
          border: 'groove',
          color: 'black',
          top: '175px',
          left: '671px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        Router
      </div>
      <div
        id="DMC"
        style={{
          position: 'absolute',
          width: '41px',
          backgroundColor: 'white',
          border: 'groove',
          color: 'black',
          top: '160px',
          left: '555px',
          fontSize: '14px',
          zIndex: '5',
        }}
      >
        DMC
      </div>
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '186px',
          left: '680px',
          width: '35px',
          height: '60px',
          zIndex: '4',
          transform: divs[83][0],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot_fct.png"
      />
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '113px',
          left: '346px',
          width: '35px',
          height: '55px',
          zIndex: '4',
          transform: divs[83][1],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot_ict.png"
      />
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '252px',
          left: '357px',
          width: '35px',
          height: '55px',
          zIndex: '4',
          transform: divs[83][2],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot_ict.png"
      />
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '95px',
          left: '170px',
          width: '35px',
          height: '60px',
          zIndex: '4',
          transform: divs[83][3],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot_fct.png"
      />
      <img
        alt=""
        id="ICT2robot"
        style={{
          position: 'absolute',
          top: '260px',
          left: '171px',
          width: '35px',
          height: '60px',
          zIndex: '4',
          transform: divs[83][4],
          transformOrigin: 'bottom',
          transition: 'transform 1s',
        }}
        src="/images/robot_fct.png"
      />
    </div>
  );
};
