import React, { Component } from 'react';
import { Row, Col, Card, Spin, Table, Progress } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { summaryColumns } from './../../../constants/tableColumns';
import {
  doRequestSummaryInformation,
  doRequestSummaryTable,
} from '../../../actions';

class SummaryContainer extends Component {
  componentDidMount() {
    /* eslint-disable no-shadow */
    const { doRequestSummaryInformation, doRequestSummaryTable } = this.props;
    /* eslint-enable no-shadow */

    const lineName = this.props.params.line;
    doRequestSummaryInformation({ line: lineName });
    doRequestSummaryTable({ line: lineName });
  }
  displayProductData(summaryInformationData, type, machine) {
    // if (type === 'ADMIN_SUMMARY_INFORMATION_REQUEST') {
    //   return (<div><Spin /></div>);
    // }
    if (type === 'ADMIN_SUMMARY_INFORMATION_FAILURE') {
      return (<div> Ooops... Something Wrong. </div>);
    }

    // machine - 0: ict, 1: fct
    if (!summaryInformationData) { return (<div><Spin /></div>); }
    // const ictData = summaryInformationData[0];
    // const fctData = machine === 1 ? summaryInformationData[1] : [];
    // if (machine === 1) {
    //   if (!ictData || !fctData) return (<div><Spin /></div>);
    // } else if (machine === 0) {
    //   if (!ictData) return (<div><Spin /></div>);
    // }

    // const ictYieldRate =
    //   ((ictData.OutputOKCount / (ictData.OutputOKCount + ictData.OutputNGCount)) * 100).toFixed(1);
    // const fctYieldRate =
    //   ((fctData.OutputOKCount / (fctData.OutputOKCount + fctData.OutputNGCount)) * 100).toFixed(1);

    const productData = [];
    const productTitleData = [];
    const productTitle = ['Input', 'Output', 'NG Count', 'Yield Rate'];
    // const productContent = [
    //   machine === 0 ? ictData.InputCount : fctData.InputCount,
    //   machine === 0 ? ictData.OutputOKCount : fctData.OutputOKCount,
    //   machine === 0 ? ictData.OutputNGCount : fctData.OutputNGCount,
    //   <Progress type="dashboard" width={100} percent={machine === 0 ? ictYieldRate : fctYieldRate} />];
    const productContent2 = ['606', '707', '20', '70'];
    const productCardColors = ['#2ab4c0', '#f36a5a', '#5C9BD1', '#8877a9'];

    productData.push(
      <Col span={24} className="col" key="productName" id="productName">
        <b >
          {machine === 1 ? 'FCT Product' : 'ICT Product'}
        </b>
      </Col>
    );
    _.map(productContent2, (value, key) => {
      productData.push(
        <Col span={6}
          className="col productCard"
          key={productTitle[key]}
        >
          <div className="cardBorder" style={{ borderColor: productCardColors[key] }}>
            <b className="cardData" style={{ color: productCardColors[key] }}>
              {key === productContent2.length - 1 ? value + '%' : value}
            </b>
            <b className="backgroundWords">{value}</b>
            <h3>{productTitle[key]}</h3>
            <br />
            <hr className="hrLine" style={{ backgroundColor: productCardColors[key] }} />
          </div>
        </Col>
      );
    });

    return (
      <Row>
       {machine === 1 ? '' : productTitleData}
       {productData}
      </Row>
    );
  }
  generateTableDataSource(data) {
    if (!data) { return ([]); }
    const arr = [];
    _.map(data, (d, idx) => {
      arr.push({
        key: idx,
        machineName: d.MachineName,
        runningTime: moment().startOf('day').seconds(d.RunningTime / 1000).format('HH:mm:ss'),
        idleTime: moment().startOf('day').seconds(d.IdleTime / 1000).format('HH:mm:ss'),
        alarmTime: moment().startOf('day').seconds(d.AlarmTime / 1000).format('HH:mm:ss'),
        recordTime: moment().startOf('day').seconds(d.RecordTime / 1000).format('HH:mm:ss'),
        inputCount: d.InputCount,
        outputOkCount: d.OutputOKCount,
        outputNgCount: d.OutputNGCount,
      });
    });

    return arr;
  }
  render() {
    const { type, summaryInformationData, summaryTableData } = this.props;
    const line = this.props.params.line;
    return (
      <div id="summary-container">
        <Row>
          <Col span={24} className="col" id="ictCol">
            {this.displayProductData(summaryInformationData, type, 0)}
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(summaryTableData)}
                columns={summaryColumns}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

SummaryContainer.propTypes = {
  params: PropTypes.object,
  doRequestSummaryInformation: PropTypes.func,
  doRequestSummaryTable: PropTypes.func,
  summaryInformationData: PropTypes.array,
  summaryTableData: PropTypes.array,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doRequestSummaryInformation,
    doRequestSummaryTable,
  },
)(SummaryContainer);
