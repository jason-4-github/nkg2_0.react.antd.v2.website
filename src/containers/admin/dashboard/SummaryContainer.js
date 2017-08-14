import React, { Component } from 'react';
import { Row, Col, Card, Spin, Table } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { summaryColumns } from './../../../constants/tableColumns';
import {
  doRequestSummaryTable,
  doRequestCount,
} from '../../../actions';

class SummaryContainer extends Component {
  componentDidMount() {
    /* eslint-disable no-shadow */
    const {
      doRequestSummaryTable,
      doRequestCount
    } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    // (XXX): need modify more common sense
    const equipmentName = 'ict';
    const timeZone = 'Asia/Bangkok';

    doRequestSummaryTable({ line: lineName });
    doRequestCount({
      countryName,
      factoryName,
      plantName,
      lineName,
      equipmentName,
      timeZone
    });
  }
  displayProductData(countData, type) {
    if (type === 'ADMIN_SUMMARY_INFORMATION_FAILURE') {
      return (<div> Ooops... Something Wrong. </div>);
    }
    if (!countData) { return (<div><Spin /></div>); }
    const ictData = countData
    const isZero =
      ictData.okQuantity + ictData.ngQuantity === 0 || ictData.okQuantity + ictData.ngQuantity === NaN
      ? true
      : false;
    const isDisconnect = _.isEmpty(ictData) || false;
    const ictYieldRate = isZero || isDisconnect
      ? '0.00'
      : ((ictData.okQuantity / (ictData.okQuantity + ictData.ngQuantity)) * 100).toFixed(2);

    const productData = [];
    const productTitle = ['Input', 'Output', 'NG Count', 'Yield Rate'];
    const productCardColors = ['#2ab4c0', '#f36a5a', '#5C9BD1', '#8877a9'];
    const productContent = [ictData.okQuantity + ictData.ngQuantity, ictData.okQuantity, ictData.ngQuantity, ictYieldRate];

    _.map(productContent, (value, key) => {
      productData.push(
        <Col span={6}
          className="col productCard"
          key={productTitle[key]}
        >
          <div className="cardBorder" style={{ borderColor: productCardColors[key] }}>
            <b className="cardData" style={{ color: productCardColors[key] }}>
              {key === productContent.length - 1 ? value + '%' : value}
            </b>
            <b className="backgroundWords">ICT</b>
            <h3>{productTitle[key]}</h3>
            <br />
            <hr className="hrLine" style={{ backgroundColor: productCardColors[key] }} />
          </div>
        </Col>
      );
    });

    return (
      <Row>
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
    const { type, summaryTableData, countData } = this.props;
    return (
      <div id="summary-container">
        <Row>
          <Col span={24} className="col" id="ictCol">
            {this.displayProductData(countData, type)}
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
  doRequestSummaryTable: PropTypes.func,
  doRequestCount: PropTypes.func,
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
    doRequestSummaryTable,
    doRequestCount,
  },
)(SummaryContainer);
