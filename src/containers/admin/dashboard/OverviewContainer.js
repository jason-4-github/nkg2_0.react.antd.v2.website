import React, { Component } from 'react';
import { Row, Col, Card, Spin, Table, Icon } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { overviewColumns } from './../../../constants/tableColumns';
import { doRequestOverviewTable } from '../../../actions';
import timeFormat from './../../../utils/timeFormat';

class OverviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineName: '',
    }
    this.selectMenuOnChange = this.selectMenuOnChange.bind(this);
  }
  componentDidMount() {
    /* eslint-disable no-shadow */
    const { doRequestOverviewTable } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    // (XXX): need modify more common sense

    doRequestOverviewTable({
      countryName,
      factoryName,
      plantName,
      lineName});
  }
  displayInformationData(overviewTableData, type) {
    if (type === 'ADMIN_OVERVIEW_INFORMATION_REQUEST') {
      return (<div><Spin /></div>);
    }
    if (type === 'ADMIN_OVERVIEW_INFORMATION_FAILURE') {
      return (<div> Ooops... Something Wrong. </div>);
    }
    // if (!overviewTableData) { return (<div style={{ textAlign: 'center' }}><Spin /></div>); }

    const isConnect = overviewTableData || false;
    const data = overviewTableData;
    const line = this.props.params.line;
    let connectionBgColor;
    let connectStatus;
    if (!isConnect && data) {
      connectionBgColor = '#d26269';
      connectStatus = <Icon type="close-circle-o" style={{ color: 'white' }} />;
    } else if (!isConnect) {
      connectionBgColor = '#b9b6b6';
      connectStatus = <Icon type="loading" />;
    } else {
      connectionBgColor = '#43b4ae';
      connectStatus = <Icon type="check-circle-o" />;
    }

    // information config set up
    const informationTableData = [];

    // compute the time and processed
    const startRunningTimeObj = moment().toObject();
    const startRunningTime = moment([startRunningTimeObj.years, startRunningTimeObj.months,
        startRunningTimeObj.date, 8, 0, 0, 0]);
    const now = moment(moment().toArray());
    const timeDiff = now.diff(startRunningTime);

    const time = !isConnect ? <Icon type="loading" /> : timeFormat(timeDiff);
    const informationTitle = ['產線名稱', '連線狀況', '連線時間'];
    const informationIcon = ['idcard', 'share-alt', 'clock-circle-o'];
    const informationContent = ['Seagate - ' + line, connectStatus, time];
    const informationCardColors = ['#588ebd', connectionBgColor, '#8674a6'];

    _.map(informationTitle, (value, key) => {
      informationTableData.push(
        <Col span={8} className="col smallCard" key={value}>
          <div className="informationCardDiv" style={{ backgroundColor: informationCardColors[key] }}>
            <Icon type={informationIcon[key]} className="overviewIcon" />
            <b className="informationWords" style={{ fontSize: value === 'Time' ? '20px' : '30px' }}>{informationContent[key]}</b>
            <br />
            <h3 className="informationTitleName">{value}</h3>
          </div>
        </Col>
      );
    });
    return (
      <div>
        {informationTableData}
      </div>
    );
  }
  selectMenuOnChange(e){
    this.setState({machineName: e});
  }
  generateTableDataSource(data) {
    if (!data) { return ([]); }
    const arr = [];

    _.map(data, (d, idx) => {
      arr.push({
        key: idx,
        machineName: d.equipmentName,
        idleTime: '00:00:00',
        alarmTime: timeFormat(d.alarmTime),
        inputCount: d.okQuantity + d.ngQuantity,
        outputOkCount: d.okQuantity,
        outputNgCount: d.ngQuantity,
        yieldRate: d.yieldRate,
        movementRate: 0 + '%',
      });
    });

    return arr;
  }
  render() {
    const { type, overviewTableData } = this.props;
    return (
      <div id="overview-container">
        <Row>
          <Col span={24}>
            {this.displayInformationData(overviewTableData, type)}
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(overviewTableData)}
                columns={overviewColumns}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

OverviewContainer.propTypes = {
  params: PropTypes.object,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doRequestOverviewTable },
)(OverviewContainer);
