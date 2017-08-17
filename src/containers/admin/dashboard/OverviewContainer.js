import React, { Component } from 'react';
import { Row, Col, Card, Spin, Table, Icon } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { overviewColumns } from './../../../constants/tableColumns';
import { doRequestOverviewTable } from '../../../actions';

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
    if (!overviewTableData) { return (<div><Spin /></div>); }

    const isConnect = overviewTableData.length !== 0;
    const data = overviewTableData;
    const line = this.props.params.line;
    let connectStatus;
    if (!isConnect && data) {
      connectStatus = <Icon type="close-circle-o" style={{ color: 'white' }} />;
    } else if (!isConnect) {
      connectStatus = 'offline';
    } else {
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

    const time = moment().startOf('day').seconds(timeDiff/1000).format('HH:mm:ss');
    const informationTitle = ['Line Name', 'Connection', 'Running Time'];
    const informationIcon = ['idcard', 'share-alt', 'clock-circle-o'];
    const informationContent = [line, connectStatus, time];
    const informationCardColors = ['#3598dc', '#e7505a', '#32c5d2'];

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
    // set the running time
    const startRunningTimeObj = moment().toObject();
    const startRunningTime = moment([startRunningTimeObj.years, startRunningTimeObj.months,
        startRunningTimeObj.date, 8, 0, 0, 0]);
    const now = moment(moment().toArray());
    const timeDiff = now.diff(startRunningTime);

    _.map(data, (d, idx) => {
      arr.push({
        key: idx,
        machineName: d.equipmentName,
        runningTime: moment().startOf('day').seconds(timeDiff/1000).format('HH:mm:ss'),
        idleTime: '00:00:00',
        alarmTime: moment().startOf('day').seconds(d.alarmTime / 1000).format('HH:mm:ss'),
        recordTime: moment().startOf('day').seconds(timeDiff/1000).format('HH:mm:ss'),
        inputCount: d.okQuantity + d.ngQuantity,
        outputOkCount: d.okQuantity,
        outputNgCount: d.ngQuantity,
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
