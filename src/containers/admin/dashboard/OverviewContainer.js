import React, { Component } from 'react';
import { Row, Col, Card, Spin, Table, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { overviewColumns } from './../../../constants/tableColumns';
import { doRequestOverviewTable, doRequestCustomer } from '../../../actions';
import timeFormat from './../../../utils/timeFormat';

class OverviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineName: '',
      dateString: moment().format('YYYY-MM-DD'),
    }
    this.selectMenuOnChange = this.selectMenuOnChange.bind(this);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
  }
  componentDidMount() {
    /* eslint-disable no-shadow */
    const { doRequestOverviewTable, doRequestCustomer } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    const { dateString } = this.state;
    // (XXX): need modify more common sense
    doRequestCustomer({countryName, factoryName, plantName, lineName});
    doRequestOverviewTable({
      countryName,
      factoryName,
      plantName,
      lineName,
      startDate: dateString,
      endDate: dateString,
    });
  }
  displayInformationData(overviewTableData, type, customerName) {
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
    // const startRunningTimeObj = moment().toObject();
    // const startRunningTime = moment([startRunningTimeObj.years, startRunningTimeObj.months,
    //     startRunningTimeObj.date, 8, 0, 0, 0]);
    // const now = moment(moment().toArray());
    // const timeDiff = now.diff(startRunningTime);

    // const time = !isConnect ? <Icon type="loading" /> : timeFormat(timeDiff);
    const informationTitle = ['產線名稱', '廠商名稱', '連線狀況'];
    const informationIcon = ['idcard', 'share-alt', 'clock-circle-o'];
    const informationContent = [line, customerName, connectStatus];
    const informationCardColors = ['#588ebd', '#8674a6', connectionBgColor];

    _.map(informationTitle, (value, key) => {
      informationTableData.push(
        <Col span={8} className="col smallCard" key={value}>
          <div className="informationCardDiv" style={{ backgroundColor: informationCardColors[key] }}>
            <Icon type={informationIcon[key]} className="overviewIcon" />
            <b className="informationWords" style={{ fontSize: '30px' }}>{informationContent[key]}</b>
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
  onDatePickerChange(date, dateString) {

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
      lineName,
      startDate: dateString,
      endDate: dateString,
    });
    this.setState({ dateString });
  }

  generateTableDataSource(data) {
    if (!data) { return ([]); }
    let arr = [];
    const typeObj = {};

    // build the group of data
    _.map(data, (d, idx) => {
      const equipmentType = d.equipmentName.split('-')[0];
      const findIndex = _.findIndex(arr, ['machineName', equipmentType]);
      if (findIndex !== -1) {
        arr[findIndex].alarmCount += d.alarmCount;
        arr[findIndex].inputCount += d.okQuantity + d.ngQuantity;
        arr[findIndex].outputOkCount += d.okQuantity;
        arr[findIndex].outputNgCount += d.ngQuantity;
        arr[findIndex].yieldRate =
          ((arr[findIndex].outputOkCount / arr[findIndex].inputCount) * 100).toFixed(2) + '%';
      } else {
        arr.push({
          key: idx,
          machineName: equipmentType,
          waitingTime: '00:00:00',
          downTime: '00:00:00',
          runningTime: '00:00:00',
          alarmCount: d.alarmCount,
          movementRate: 0 + '%',
          inputCount: d.okQuantity + d.ngQuantity,
          outputOkCount: d.okQuantity,
          outputNgCount: d.ngQuantity,
          yieldRate: d.yieldRate,
          children: [],
        });
      }
    });

    // sorted the group of data, like: router -> ict
    arr = _.sortBy(arr, (dataGroup) => { return dataGroup.equipmentName; }).reverse();

    // sorted the children data, like: ict1 -> ict2
    const sortedChildrenData = _.sortBy(data, (o) => { return o.equipmentName; });

    // combine the children to group
    _.map(sortedChildrenData, (d, idx) => {
      const equipmentType = d.equipmentName.split('-')[0];
      const findIndex = _.findIndex(arr, ['machineName', equipmentType]);
      if (findIndex !== -1) {
        arr[findIndex].children.push({
          key: equipmentType + '_' + idx,
          machineName: d.equipmentName,
          waitingTime: '00:00:00',
          downTime: '00:00:00',
          runningTime: '00:00:00',
          alarmCount: d.alarmCount,
          movementRate: 0 + '%',
          inputCount: d.okQuantity + d.ngQuantity,
          outputOkCount: d.okQuantity,
          outputNgCount: d.ngQuantity,
          yieldRate: d.yieldRate,
        });
      }
    });

    return arr;
  }
  render() {
    const { type, overviewTableData, customerName } = this.props;
    const now = moment().format('YYYY/MM/DD');
    const dateFormat = 'YYYY-MM-DD';
    const isTableSpin = type && type.split('_')[3] === 'REQUEST' ? true : false ;

    return (
      <div id="overview-container">
        <Row>
          <Col span={24}>
            {this.displayInformationData(overviewTableData, type, customerName)}
          </Col>
          <Col span={24} style={{ textAlign: 'right', paddingRight: '5px' }}>
            <DatePicker
              onChange={this.onDatePickerChange}
              format={dateFormat}
              className="info-margin"
              defaultValue={moment(now, dateFormat)}
            />
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(overviewTableData, type)}
                loading={isTableSpin}
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
  { doRequestOverviewTable,
    doRequestCustomer },
)(OverviewContainer);
