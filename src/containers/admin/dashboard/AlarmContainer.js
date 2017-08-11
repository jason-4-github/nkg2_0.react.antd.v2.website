import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

// import { alarmColumns } from './../../../constants/tableColumns';
import {
  doRequestAlarmHour,
  doRequestAlarmDate,
  doRequestAlarmMonth,
  doRequestAlarmDuration,
} from '../../../actions';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class AlarmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'date',
      datePickerValue: moment().format('YYYY-MM-DD'),
      isSearchButtonDisable: true,
      yearValue: moment().format('YYYY'),
    };

    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onDurationPickerChange = this.onDurationPickerChange.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
  }
  componentDidMount() {
    const date = moment().format('YYYY-MM-DD');
    this.doSearch('all', date);
  }
  onDatePickerChange(date, dateString) {
    const isMonth = dateString.split('-').length === 2 || false;
    this.doSearch( isMonth ? 'date' : 'hour', dateString);
  }
  onDurationPickerChange(date, dateString) {
    this.doSearch( 'duration', dateString);
  }
  doSearch(type, onChangeValue) {
    /* eslint-disable no-shadow */
    const {
      doRequestAlarmHour,
      doRequestAlarmDate,
      doRequestAlarmMonth,
      doRequestAlarmDuration,
    } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    const year = type !== 'month' ? onChangeValue.split('-')[0] : onChangeValue;
    const month = type !== 'month' ? onChangeValue.split('-')[1] : onChangeValue;
    const lastDay = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    const date = onChangeValue
    let startTime = type === 'month' ? `${year}-01-01` : `${year}-${month}-01`;
    let endTime = type === 'month' ? `${year}-12-31` : `${year}-${month}-${lastDay}`;
    if (type === 'duration') {
      endTime = date;
      startTime = moment(date, 'YYYY-MM-DD').add(-6, 'days').format('YYYY-MM-DD');
    }

    // (XXX): need modify more common sense
    const equipmentName = 'ict';
    const timeZone = 'Asia/Bangkok';

    const defaultobjs = {
      countryName,
      factoryName,
      plantName,
      lineName,
      equipmentName,
      timeZone,
      date,
      startTime,
      endTime,
    }

    // the function config the different actionType
    const defaultObjsFunc = (type, defaultobjs) => {
      defaultobjs.actionType = type;
      return defaultobjs;
    }

    // call action with type
    if (type === 'hour') doRequestAlarmHour(defaultObjsFunc('hour', defaultobjs));
    else if (type ==='date') doRequestAlarmDate(defaultObjsFunc('date', defaultobjs));
    else if (type === 'month') doRequestAlarmMonth(defaultObjsFunc('month', defaultobjs));
    else if (type === 'duration') doRequestAlarmDuration(defaultObjsFunc('duration', defaultobjs));
    else {
      doRequestAlarmHour(defaultObjsFunc('hour', defaultobjs));
      doRequestAlarmDate(defaultObjsFunc('date', defaultobjs));
      doRequestAlarmMonth(defaultObjsFunc('month', defaultobjs));
      doRequestAlarmDuration(defaultObjsFunc('year', defaultobjs));
    }
  }
  // process data for table
  generateTableDataSource(data) {
    const arr = [];
    _.map(data, (d, idx) => {
      arr.push({
        key: idx,
        no: idx + 1,
        machineName: d.MachineName,
        alarmCode: d.AlarmCode,
        alarmDescription: d.AlarmDescription,
        count: d.AlarmCount,
        alarmTime: moment().startOf('day').seconds(d.AlarmTime).format('HH:mm:ss'),
        idleTime: moment().startOf('day').seconds(d.RecoverTime).format('HH:mm:ss'),
        alarmTotalTime: moment().startOf('day').seconds(d.AlarmTime + d.RecoverTime).format('HH:mm:ss'),
      });
    });

    return arr;
  }
  generateChart(data, type, actionType) {
    if (!data) { return []; }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[3] === 'REQUEST' ?  '' : actionTypeSplit[2].toLowerCase();

    const arr = [];
    let index = 0;
    _.map(data.status, (d, key) => {
      if (d.totalAlarmTime > 0) {
        index += 1;
        arr.push({
          // times: (key + 1).toString(),
          times: index + '',
          machineName: data.equipmentName,
          alarmTime: d.totalAlarmTime / 1000,
          idleTime: 0,
          alarmCount: d.count,
        });
      }
    });

    const Frame = G2.Frame;
    let frame = new Frame(arr);
    // TODO(Jason Hsu): axis name need to modify
    frame = Frame.combinColumns(frame, ['alarmTime', 'idleTime', 'machineName'], 'count', 'type', ['times', 'alarmCount']);

    const Chart = createG2((chart) => {
      chart.col('count', { alias: 'Time (s)', min: 0 });
      chart.col('alarmCount', { alias: 'Count', min: 0 });
      // 去除 X 轴标题
      chart.axis('times', {
        title: null,
      });
      // 不显示图例
      chart.legend(false);
      // 绘制层叠柱状图
      chart.intervalStack()
        .position('times*count')
        .color('type', ['#348cd1', '#43b5d8']);
      // 绘制曲线图
      chart.line()
        .position('times*alarmCount')
        .color('#5ed470')
        .size(2)
        .shape('smooth');
      // 绘制点图
      chart.point()
        .position('times*alarmCount')
        .color('#5ed470');
      // control the animate
      if(animate !== type)chart.animate(false);
      chart.render();
    });

    return (
      <Chart
        data={frame}
        width={450}
        height={250}
        forceFit
      />
    );
  }
  handleMonthDropdown(e) {
    const monthOptions = ['2016', '2017'];
    this.doSearch('month', monthOptions[e.key - 1]);
    this.setState({ yearValue: monthOptions[e.key - 1] });
  }
  renderPicker(type) {
    let now;
    if (type === 'month') {
      now = moment().format('YYYY');
      const menu = (
        <Menu onSelect={this.handleMonthDropdown}>
          <Menu.Item key="1">2016</Menu.Item>
          <Menu.Item key="2">2017</Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>
            { this.state.yearValue } <Icon type="down" />
          </Button>
        </Dropdown>
      );
    }
    if (type === 'date') {
      now = moment().format('YYYY/MM');
      return (
        <MonthPicker
          onChange={this.onDatePickerChange}
          format={monthFormat}
          className="info-margin"
          defaultValue={moment(now, monthFormat)}
        />
      );
    }
    if (type === 'duration') {
      now = moment().format('YYYY/MM/DD');
      return (
        <DatePicker
        onChange={this.onDurationPickerChange}
        format={dateFormat}
        className="info-margin"
        defaultValue={moment(now, dateFormat)}
      />
      );
    }
    now = moment().format('YYYY/MM/DD');
    return (
      <DatePicker
        onChange={this.onDatePickerChange}
        format={dateFormat}
        className="info-margin"
        defaultValue={moment(now, dateFormat)}
      />
    );
  }
  render() {
    const { alarmHourData, alarmDateData, alarmMonthData, alarmDurationData, type } = this.props;
    const actionTypeSplit = type.split('_');
    let hourRequestSpin, dateRequestSpin, monthRequestSpin, durationRequestSpin;
    if ( actionTypeSplit[3] === 'REQUEST') {
      hourRequestSpin = actionTypeSplit[2] === 'HOUR' || false;
      dateRequestSpin = actionTypeSplit[2] === 'DATE' || false;
      monthRequestSpin = actionTypeSplit[2] === 'MONTH' || false;
      durationRequestSpin = actionTypeSplit[2] === 'DURATION' || false;
    }

    return (
      <div id="alarm-container">
        <Row>
          <Col span={12} className="col chartRow gutter-row">
            <Card
              className="gutter-box"
              title={
                <Row>
                  <Col span={12}>
                    <h3 className="leftWord">
                      Hour
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    { this.renderPicker('hour') }
                  </Col>
                </Row>
              }
            >
              { alarmHourData !== undefined && !hourRequestSpin
                ? this.generateChart(alarmHourData, 'hour', type)
                : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
          <Col span={12} className="col chartRow gutter-row">
            <Card
              className="gutter-box"
              title={
                <Row>
                  <Col span={12}>
                    <h3 className="leftWord">
                      Month
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    { this.renderPicker('month') }
                  </Col>
                </Row>
              }
            >
              { alarmMonthData !== undefined && !monthRequestSpin
                ? this.generateChart(alarmMonthData, 'month', type)
                  : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
          <Col span={24} className="chartPadding" />
          <Col span={12} className="col chartRow gutter-row">
            <Card
              className="gutter-box"
              title={
                <Row>
                  <Col span={12}>
                    <h3 className="leftWord">
                      Date
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    { this.renderPicker('date') }
                  </Col>
                </Row>
              }
            >
              { alarmDateData !== undefined && !dateRequestSpin
                ? this.generateChart(alarmDateData, 'date', type)
                : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
          <Col span={12} className="col chartRow gutter-row">
            <Card
              className="gutter-box"
              title={
                <Row>
                  <Col span={12}>
                    <h3 className="leftWord">
                      Past 7 days
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    { this.renderPicker('duration') }
                  </Col>
                </Row>
              }
            >
              { alarmDurationData !== undefined && !durationRequestSpin
                ? this.generateChart(alarmDurationData, 'duration', type)
                : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
          {/* <Col span={24} className="col">
             <Card>
              <Table
                dataSource={this.generateTableDataSource(alarmChartData)}
                columns={alarmColumns}
              />
            </Card>
          </Col> */}
        </Row>
      </div>
    );
  }
}

AlarmContainer.propTypes = {
  params: PropTypes.object,
  doRequestAlarmHour: PropTypes.func,
  doRequestAlarmDate: PropTypes.func,
  doRequestAlarmMonth: PropTypes.func,
  doRequestAlarmDuration: PropTypes.func,
  alarmChartData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doRequestAlarmHour,
    doRequestAlarmDate,
    doRequestAlarmMonth,
    doRequestAlarmDuration,
  },
)(AlarmContainer);
