import React, { Component } from 'react';
import { Row, Col, Card, Table, Radio, DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { alarmColumns } from './../../../constants/tableColumns';
import {
  doRequestAlarmTable,
} from '../../../actions';

const { MonthPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class AlarmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'date',
      datePickerValue: moment().format('YYYY-MM-DD'),
      isSearchButtonDisable: true,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }
  componentDidMount() {
    this.doSearch();
  }
  onDatePickerChange(date, dateString) {
    this.setState({
      datePickerValue: dateString,
      isSearchButtonDisable: !dateString,
    });
  }
  onFilterChange(e) {
    /* eslint-disable no-shadow */
    const { doRequestAlarmTable } = this.props;
    /* eslint-enable no-shadow */

    const filterDate = moment().format(e.target.value === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD');

    doRequestAlarmTable({
      line: this.props.params.line,
      date: filterDate,
      filter: e.target.value,
    });
    this.setState({
      datePickerValue: '',
      filterValue: e.target.value,
    });
    setTimeout(() => {
      this.setState({
        isSearchButtonDisable: !this.state.datePickerValue,
      });
    }, 100);
  }
  doSearch() {
    /* eslint-disable no-shadow */
    const { doRequestAlarmTable } = this.props;
    /* eslint-enable no-shadow */

    const lineName = this.props.params.line;
    doRequestAlarmTable({
      line: lineName,
      date: this.state.datePickerValue,
      filter: this.state.filterValue,
    });
  }
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
  generateChart(data) {
    if (!data) { return []; }
    const arr = [];
    _.map(data, (d, idx) => {
      arr.push({
        times: (idx + 1).toString(),
        machineName: d.MachineName,
        alarmTime: d.AlarmTime,
        idleTime: d.RecoverTime,
        alarmCount: d.AlarmCount,
      });
    });

    const Frame = G2.Frame;
    let frame = new Frame(arr);
    frame = Frame.combinColumns(frame, ['alarmTime', 'idleTime', 'machineName'], 'count', 'type', ['times', 'alarmCount']);

    const Chart = createG2((chart) => {
      chart.col('count', { alias: 'Count', min: 0 });
      chart.col('alarmCount', { alias: 'Time (s)', min: 0 });
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

      chart.render();
    });

    return (
      <Chart
        data={frame}
        width={450}
        height={450}
        forceFit
      />
    );
  }
  renderPicker() {
    let now;
    if (this.state.filterValue === 'month') {
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
    const { alarmChartData } = this.props;

    return (
      <div id="alarm-container">
        <Row>
          <Col span={24} className="col">
            <Card title={
              <div style={{ textAlign: 'right' }}>
                <RadioGroup defaultValue="date" onChange={this.onFilterChange}>
                  <RadioButton value="date">Date</RadioButton>
                  <RadioButton value="week">Week</RadioButton>
                  <RadioButton value="month">Month</RadioButton>
                </RadioGroup>
                { this.renderPicker() }
                <Button
                  type="primary"
                  shape="circle"
                  icon="search"
                  className="info-margin"
                  onClick={this.doSearch}
                  disabled={this.state.isSearchButtonDisable}
                />
              </div>
            }>
              { this.generateChart(alarmChartData) }
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(alarmChartData)}
                columns={alarmColumns}
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
  doRequestAlarmTable: PropTypes.func,
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
    doRequestAlarmTable,
  },
)(AlarmContainer);
