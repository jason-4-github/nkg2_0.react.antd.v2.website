import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Spin, Select, Table } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { downtimeColumns } from './../../../constants/tableColumns';
import {
  doRequestAlarm,
} from '../../../actions';

const { MonthPicker } = DatePicker;
const Option = Select.Option;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class DowntimeContainer extends Component {
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
      if (type === 'duration') {
        defaultobjs.endTime = date;
        defaultobjs.startTime = moment(date, 'YYYY-MM-DD').add(-6, 'days').format('YYYY-MM-DD');
      }
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
      doRequestAlarmDuration(defaultObjsFunc('duration', defaultobjs));
    }
  }
  // process data for table
  generateTableDataSource(data) {
    const arr = [];
    _.map(data, (d, idx) => {
      const downtimeHour = Math.trunc(moment.duration(d.AlarmTime).asHours());
      const downtimeMMSS = moment().startOf('day').seconds(d.AlarmTime / 1000).format('mm:ss');
      arr.push({
        key: idx,
        no: d.MachineNo,
        machineName: d.MachineName,
        downTime: `${downtimeHour}:${downtimeMMSS}`,
      });
    });

    return arr;
  }
  generateChart(data, type, actionType) {
    if (!data || _.isEmpty(data)) { return []; }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[3] === 'REQUEST' ?  '' : actionTypeSplit[2].toLowerCase();

    const arr = [];
    _.map(data.status, (d, idx) => {
      if (d.totalAlarmTime > 0) {
        arr.push({
          name: idx,
          value: d.totalAlarmTime / 1000,
        });
      }
    });

    const Chart = createG2((chart) => {
      const Stat = G2.Stat;
      // 重要：绘制饼图时，必须声明 theta 坐标系
      chart.coord('theta', {
        radius: 0.6, // 设置饼图的大小
      });
      chart.legend('name', {
        position: 'bottom',
        itemWrap: true,
      });
      chart.tooltip({
        title: null,
        map: {
          value: 'value',
        },
      });
      chart.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('name')
        .label('name*..percent', (name, percent) => {
          const per = (percent * 100).toFixed(2);
          return `[${name}]: ${per}%`;
        });
      // control the animate
      if(animate !== type)chart.animate(false);
      chart.render();
      // 设置默认选中
      const geom = chart.getGeoms()[0]; // 获取所有的图形
      const items = geom.getData(); // 获取图形对应的数据
      geom.setSelected(items[1]); // 设置选中
    });

    return (
      <Chart
        data={arr}
        width={500}
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
    const { alarmData, type } = this.props;
    const { filterValue } = this.state;

    const actionTypeSplit = type.split('_');
    const requestSpin = actionTypeSplit[3] === 'REQUEST' || false;
    return (
      <div id="downtime-container">
        <Row gutter={10}>
          <Col span={24} className="col chartRow">
            <Card
              className="gutter-box"
              title={
                <Row>
                  <Col span={12}>
                    <h3 className="leftWord">
                    { filterValue.charAt(0).toUpperCase() + filterValue.slice(1) }
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    <Select defaultValue="hour" style={{ width: '100px' }} onChange={this.onFilterChange}>
                      <Option value="hour">Hour</Option>
                      <Option value="date">Date</Option>
                      <Option value="month">Month</Option>
                    </Select>
                    { this.renderPicker() }
                  </Col>
                </Row>
              }
            >
              { alarmData !== undefined && !requestSpin
                ? this.generateChart(alarmData, type)
                : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(alarmData)}
                columns={downtimeColumns}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

DowntimeContainer.propTypes = {
  params: PropTypes.object,
  doRequestAlarm: PropTypes.func,
  alarmData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
   mapStateToProps,
  {
    doRequestAlarm,
  },
)(DowntimeContainer);
