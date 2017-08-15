import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Spin, Table } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { alarmColumns } from './../../../constants/tableColumns';
import { doRequestAlarm, doRequestEquipmentName } from '../../../actions';
import SelectMenu from './../../../components/SelectMenu';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class AlarmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'hour',
      monthDropdownValue: moment().format('YYYY'),
      machineName: 'ICT-2',
      dateString: moment().format('YYYY-MM-DD'),
    };

    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.selectMenuOnChange = this.selectMenuOnChange.bind(this);
  }
  componentDidMount() {
    const date = moment().format('YYYY-MM-DD');
    this.doSearch('hour', date);
  }

  onFilterChange(e) {
    const filterDate = moment().format(e === 'month' ? 'YYYY' : 'YYYY-MM-DD');
    this.doSearch(e, filterDate, this.state.machineName);
    this.setState({ filterValue: e });
  }
  // do the date or hour action
  onDatePickerChange(date, dateString) {
    const { filterValue, machineName } = this.state;
    this.doSearch(filterValue, dateString, machineName);
    this.setState({ dateString });
  }
  doSearch(type, onChangeValue, machineName) {
    /* eslint-disable no-shadow */
    const { doRequestAlarm } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    const year = type !== 'month' ? onChangeValue.split('-')[0] : onChangeValue;
    const month = type !== 'month' ? onChangeValue.split('-')[1] : onChangeValue;
    const lastDay = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    const date = onChangeValue
    const startTime = type === 'month' ? `${year}-01-01` : `${year}-${month}-01`;
    const endTime = type === 'month' ? `${year}-12-31` : `${year}-${month}-${lastDay}`;

    // (XXX): need modify more common sense
    const timeZone = 'Asia/Bangkok';
    const equipmentName = !machineName ? machineName : machineName.split('-')[0];
    const equipmentSerial = !machineName ? machineName : machineName.split('-')[1];

    const defaultobjs = {
      countryName,
      factoryName,
      plantName,
      equipmentName,
      equipmentSerial,
      lineName,
      timeZone,
      date,
      startTime,
      endTime,
      actionType: type,
    }

    doRequestAlarm(defaultobjs);
  }
  // process data for table
  generateTableDataSource(data) {
    if (!data) return;
    // TODO(jasonHsu): time need to modify if total time > 24 hours
    const arr = [];
    let keyCount = 1;
    _.map(data, (d, idx) => {
      if (d.totalAlarmTime) {
        arr.push({
          no: keyCount,
          machineName: d.equipmentName,
          alarmCode: d.alarmCode,
          alarmDescription: d.description,
          count: d.count,
          alarmTime: moment().startOf('day').seconds(d.totalAlarmTime/1000).format('HH:mm:ss'),
        });
        keyCount += 1;
      }
    });

    return arr;
  }
  generateChart(data, actionType) {
    if (!data) { return []; }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[2] === 'REQUEST' ?  '' : actionTypeSplit[1].toLowerCase();

    const arr = [];
    let index = 0;
    _.map(data, (d, key) => {
      if (d.totalAlarmTime > 0) {
        index += 1;
        arr.push({
          times: index + '',
          machineName: d.equipmentName,
          alarmTime: d.totalAlarmTime / 1000,
          idleTime: 0,
          alarmCount: d.count,
          alarmCode: d.alarmCode,
        });
      }
    });

    const Frame = G2.Frame;
    let frame = new Frame(arr);
    // TODO(Jason Hsu): axis name need to modify
    frame = Frame.combinColumns(frame, ['alarmTime', 'idleTime', 'machineName'], 'count', 'type', ['alarmCode', 'alarmCount']);

    const Chart = createG2((chart) => {
      chart.col('count', { alias: 'Time (s)', min: 0 });
      chart.col('alarmCount', { alias: 'Count', min: 0 });
      // 去除 X 轴标题
      chart.axis('alarmCode', {
        title: null,
      });
      // 不显示图例
      chart.legend(false);
      // 绘制层叠柱状图
      chart.intervalStack()
        .position('alarmCode*count')
        .color('type', ['#348cd1', '#43b5d8']);
      // 绘制曲线图
      chart.line()
        .position('alarmCode*alarmCount')
        .color('#5ed470')
        .size(2)
        .shape('smooth');
      // 绘制点图
      chart.point()
        .position('alarmCode*alarmCount')
        .color('#5ed470');
      // control the animate
      if(animate === '')chart.animate(false);
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
    const onChangeValue = monthOptions[e.key - 1];
    this.doSearch('month', onChangeValue, this.state.machineName);
    this.setState({ monthDropdownValue: onChangeValue });
  }
  renderPicker() {
    let now;
    if (this.state.filterValue === 'month') {
      now = moment().format('YYYY');
      const menu = (
        <Menu onSelect={this.handleMonthDropdown}>
          <Menu.Item key="1">2016</Menu.Item>
          <Menu.Item key="2">2017</Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="info-margin">
            { this.state.monthDropdownValue } <Icon type="down" />
          </Button>
        </Dropdown>
      );
    }
    if (this.state.filterValue === 'date') {
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
  selectMenuOnChange(e){
    const { filterValue, dateString, monthDropdownValue } = this.state;
    this.doSearch(filterValue, filterValue === 'month' ? monthDropdownValue : dateString , e);
    this.setState({machineName: e});
  }
  render() {
    const { alarmData, type } = this.props;
    const { filterValue } = this.state;

    const actionTypeSplit = type.split('_');
    const requestSpin = actionTypeSplit[3] === 'REQUEST' || false;

    return (
      <div id="alarm-container">
        <Row gutter={10}>
          <Col span={24} className="rightWord">
            <SelectMenu options={['ICT-2', 'ICT-1']} styleName="ictRouterSelect" onChangeFunc={this.selectMenuOnChange} container="alarm" />
          </Col>
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
                    <SelectMenu options={['Hour', 'Date', 'Month']} styleName="selectDateType" onChangeFunc={this.onFilterChange} container="alarm" />
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
                columns={alarmColumns}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

AlarmContainer.propTypes = {
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
  { doRequestAlarm,
    doRequestEquipmentName },
)(AlarmContainer);
