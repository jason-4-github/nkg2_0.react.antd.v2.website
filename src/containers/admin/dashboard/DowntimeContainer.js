import React, { Component } from 'react';
import { Row, Col, Card, Table, Radio, DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { downtimeColumns } from './../../../constants/tableColumns';
import {
  doRequestDowntimeTable,
} from '../../../actions';

const { MonthPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class DowntimeContainer extends Component {
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
    const { doRequestDowntimeTable } = this.props;
    /* eslint-enable no-shadow */

    const filterDate = moment().format(e.target.value === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD');

    doRequestDowntimeTable({
      line: this.props.params.line,
      date: filterDate,
      filter: e.target.value,
    });

    this.setState({
      datePickerValue: '',
      filterValue: e.target.value,
    });

    if (e.target.value === 'year') {
      this.setState({
        isSearchButtonDisable: false,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isSearchButtonDisable: !this.state.datePickerValue,
        });
      }, 100);
    }
  }
  doSearch() {
    /* eslint-disable no-shadow */
    const { doRequestDowntimeTable } = this.props;
    /* eslint-enable no-shadow */

    doRequestDowntimeTable({
      line: this.props.params.line,
      date: this.state.datePickerValue,
      filter: this.state.filterValue,
    });
  }
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
  generateChart(data) {
    if (!data) { return []; }
    const arr = [];
    _.map(data, (d) => {
      if (d.MachineName === 'Total Time') return;
      arr.push({
        name: d.MachineName,
        value: d.AlarmTime,
      });
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
        height={450}
        forceFit
      />
    );
  }
  renderPicker() {
    if (this.state.filterValue === 'year') {
      return '';
    }
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
    const { downtimeTableData } = this.props;
    return (
      <div id="downtime-container">
        <Row>
          <Col span={14} className="col">
            <Card title={
              <div>
                <RadioGroup defaultValue="date" onChange={this.onFilterChange}>
                  <RadioButton value="date">Date</RadioButton>
                  <RadioButton value="week">Week</RadioButton>
                  <RadioButton value="month">Month</RadioButton>
                  <RadioButton value="year">Year</RadioButton>
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
              { this.generateChart(downtimeTableData) }
            </Card>
          </Col>
          <Col span={10} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(downtimeTableData)}
                columns={downtimeColumns}
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
  doRequestDowntimeTable: PropTypes.func,
  downtimeTableData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doRequestDowntimeTable,
  },
)(DowntimeContainer);
