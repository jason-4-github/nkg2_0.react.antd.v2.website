import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Table, Spin } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { downtimeColumns } from './../../../constants/tableColumns';
import { doRequestDowntime } from '../../../actions';
import SelectMenu from './../../../components/SelectMenu';
import timeFormat from './../../../utils/timeFormat';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class DowntimeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'hour',
      monthDropdownValue: moment().format('YYYY'),
      chartData: [],
      barChartDesperate: true,
      machineName: 'ICT-2',
      dateString: moment().format('YYYY-MM-DD'),
    };

    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.handleChartClick = this.handleChartClick.bind(this);
    this.generatePieChart = this.generatePieChart.bind(this);
  }
  componentDidMount() {
    const date = moment().format('YYYY-MM-DD');
    this.doSearch('hour', date);
  }
  onFilterChange(e) {
    const filterDate = moment().format(e === 'month' ? 'YYYY' : 'YYYY-MM-DD');

    this.doSearch(e, filterDate);
    this.setState({
      filterValue: e,
      barChartDesperate: true,
    });
  }
  // do the date or hour action
  onDatePickerChange(date, dateString) {
    const { filterValue } = this.state;
    this.doSearch(filterValue, dateString);
    this.setState({
      dateString,
      barChartDesperate: true,
    });
  }
  doSearch(type, onChangeValue) {
    /* eslint-disable no-shadow */
    const { doRequestDowntime } = this.props;
    /* eslint-enable no-shadow */

    const countryName = this.props.params.country;
    const factoryName = this.props.params.factory;
    const plantName = this.props.params.plant;
    const lineName = this.props.params.line;
    const year = type !== 'month' ? onChangeValue.split('-')[0] : onChangeValue;
    const month = type !== 'month' ? onChangeValue.split('-')[1] : onChangeValue;
    const lastDay = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    const date = onChangeValue
    const startDate = type === 'month' ? `${year}-01-01` : `${year}-${month}-01`;
    const endDate = type === 'month' ? `${year}-12-31` : `${year}-${month}-${lastDay}`;


    // (XXX): need modify more common sense
    const timeZone = 'Asia/Bangkok';

    const defaultobjs = {
      countryName,
      factoryName,
      plantName,
      lineName,
      timeZone,
      date,
      startDate,
      endDate,
      timeUnit: type,
    }

    doRequestDowntime(defaultobjs);
  }
  // process data for table
  generateTableDataSource(data) {
    if (!data) return;
    const arr = [];
    let keyCount = 1;
    _.map(data, (d, idx) => {
      if (d.totalAlarmTime) {
        arr.push({
          no: keyCount,
          machineName: d.equipmentName,
          downTime: timeFormat(d.totalAlarmTime),
        });
        keyCount += 1;
      }
    });

    return arr;
  }
  generateChart(data, actionType) {
    if (_.isEmpty(data)) return(
      <div>
        <div className="emptyDiv" />
        <h3>Oops! No information yet!</h3>
      </div>
    );

    const { barChartDesperate } = this.state;
    const dataArrs = [];
    if (barChartDesperate) {
      _.map(data, (value) => {
        if (value.equipmentName === this.state.machineName) dataArrs.push(value);
      });
    }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[2] === 'REQUEST' ?  '' : actionTypeSplit[1].toLowerCase();

    const arr = [];
    let index = 0;
    _.map(barChartDesperate ? dataArrs : data, (d, key) => {
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
  handleChartClick(data) {
    this.setState({
      chartData: data,
      barChartDesperate: false,
    })
  }
  generatePieChart(data, handleChartClick) {
    // return words if no data
    if (_.isEmpty(data)) return(
      <div>
        <div className="emptyDiv" />
        <h3>Oops! No information yet!</h3>
      </div>
    );

    const arr = [];
    _.map(data, (d, idx) => {
      if (d.totalAlarmTime > 0) {
        arr.push({
          name: idx,
          equipmentName: d.equipmentName,
          value: d.totalAlarmTime / 1000,
        });
      }
    });

    const Chart = createG2((chart) => {
      const Stat = G2.Stat;
      // 重要：绘制饼图时，必须声明 theta 坐标系
      chart.coord('theta', {
        radius: 0.8, // 设置饼图的大小
      });
      chart.legend('equipmentName', {
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
        .color('equipmentName')
        .label('equipmentName*..percent', (name, percent) => {
          const per = (percent * 100).toFixed(2);
          return `[${name}]: ${per}%`;
        });

      chart.render();

      chart.on('plotclick',function(ev){
        var tmpData = ev.data;
        if (tmpData) {
          const tmpEquipmentName = tmpData._origin.equipmentName;
          const tmpArrs = [];
          _.map(data, (value) => {
            if (value.equipmentName === tmpEquipmentName) tmpArrs.push(value);
          });

          handleChartClick(tmpArrs);
        }
      });

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
    const onChangeValue = monthOptions[e.key - 1];
    this.doSearch('month', onChangeValue);
    this.setState({
      monthDropdownValue: onChangeValue,
      barChartDesperate: true,
    });
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
  render() {
    const { downtimeData, type, isBarChartUpdate } = this.props;
    const { filterValue, chartData, barChartDesperate } = this.state;
    const actionTypeSplit = type.split('_');
    const requestSpin = actionTypeSplit[3] === 'REQUEST' || false;

    const timeOptions = ['Hour', 'Date', 'Month'];
    const alarmTitle = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);

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
                    { alarmTitle }
                    <b style={{ paddingLeft: '10px' }}>[可點擊圓餅圖以呈現Alarm資料]</b>
                    </h3>
                  </Col>
                  <Col span={12} className="rightWord">
                    <SelectMenu options={timeOptions} styleName="selectDateType" onChangeFunc={this.onFilterChange} container="downtime" />
                    { this.renderPicker() }
                  </Col>
                </Row>
              }
            >
              <Col span={12} className="chartCol">
                { downtimeData !== undefined && !requestSpin
                  ? this.generatePieChart(downtimeData, this.handleChartClick)
                  : <div className="defaultChartDiv">
                      <div className="emptyDiv" />
                      <Spin />
                    </div>
                }
              </Col>
              <Col span={12} className="chartCol">
                { downtimeData !== undefined && !requestSpin
                  ? this.generateChart(barChartDesperate ? isBarChartUpdate : chartData , type)
                  : <div className="defaultChartDiv">
                      <div className="emptyDiv" />
                      <Spin />
                    </div>
                }
              </Col>
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(downtimeData)}
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
  doRequestDowntime: PropTypes.func,
  downtimeData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doRequestDowntime },
)(DowntimeContainer);
