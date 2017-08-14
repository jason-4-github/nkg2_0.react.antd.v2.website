import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Spin, Select, Table } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { doRequestOutput } from '../../../actions';
import { outputColumns } from './../../../constants/tableColumns';

const { MonthPicker } = DatePicker;
const Option = Select.Option;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class OutputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'hour',
      monthDropdownValue: moment().format('YYYY'),
    };

    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  componentDidMount() {
    const date = moment().format('YYYY-MM-DD');
    this.doSearch('hour', date);
  }

  onFilterChange(e) {
    const filterDate = moment().format(e === 'month' ? 'YYYY' : 'YYYY-MM-DD');

    this.doSearch(e, filterDate);
    this.setState({ filterValue: e });
  }
  // do the date or hour action
  onDatePickerChange(date, dateString) {
    this.doSearch(this.state.filterValue, dateString);
  }
  doSearch(type, onChangeValue) {
    /* eslint-disable no-shadow */
    const { doRequestOutput } = this.props;
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
      actionType: type,
    }

    doRequestOutput(defaultobjs);
  }
  generateChart(data, actionType) {
    if (!data) { return []; }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[2] === 'REQUEST' ?  '' : actionTypeSplit[1].toLowerCase();

    const arr = [];
    _.map(data, (d) => {
      const yr = ((d.okQuantity / (d.okQuantity + d.ngQuantity)) * 100);
      let yrRounding = Math.round(yr * 100) / 100;
      let timeString = d.time + '';

      if (isNaN(yrRounding)) { yrRounding = 0; }

      if (animate === 'hour') timeString = _.split(d.time, ':')[0];
      else if (animate === 'date') timeString = _.split(d.time, '/')[1];

      arr.push({
        dateString: timeString,
        okQuantity: d.okQuantity,
        yieldRate: yrRounding,
      });
    });

    const Frame = G2.Frame;
    let frame = new Frame(arr);
    frame = Frame.combinColumns(frame, ['okQuantity'], 'count', 'type', ['dateString', 'yieldRate']);

    const Chart = createG2((chart) => {
      chart.col('count', { alias: 'Output', min: 0 });
      chart.col('yieldRate', { alias: 'Yield Rate', min: 0 });
      // 去除 X 轴标题
      chart.axis('dateString', {
        title: null,
      });
      // 不显示图例
      chart.legend(false);
      // 绘制层叠柱状图
      chart.intervalStack()
        .position('dateString*count')
        .color('type', ['#348cd1']);
      // 绘制曲线图
      chart.line()
        .position('dateString*yieldRate')
        .color('#5ed470')
        .size(2)
        .shape('smooth');
      // 绘制点图
      chart.point()
        .position('dateString*yieldRate')
        .color('#5ed470');
      // control the animate
      if(animate === '')chart.animate(false);
      chart.render();
    });

    return (
      <Chart
        data={frame}
        width={550}
        height={250}
        forceFit
      />
    );
  }
  generateTableDataSource(data) {
    const arr = [];
    _.map(data, (d, idx) => {
      let yr = ((d.okQuantity / (d.okQuantity + d.ngQuantity)) * 100).toFixed(2);

      if (isNaN(yr)) { yr = 0; }
      arr.push({
        key: idx,
        no: idx + 1,
        date: d.time,
        output: d.okQuantity,
        outputNG: d.ngQuantity,
        yieldRate: `${yr}%`,
      });
    });

    return arr;
  }
  handleMonthDropdown(e) {
    const monthOptions = ['2016', '2017'];
    const onChangeValue = monthOptions[e.key - 1];
    this.doSearch('month', onChangeValue);
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
  render() {
    const { outputData, type } = this.props;
    const { filterValue } = this.state;

    const actionTypeSplit = type.split('_');
    const requestSpin = actionTypeSplit[3] === 'REQUEST' || false;
    return (
      <div id="output-container">
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
              { outputData !== undefined && !requestSpin
                ? this.generateChart(outputData, type)
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
                dataSource={this.generateTableDataSource(outputData)}
                columns={outputColumns}
                size="small"
              />
             </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

OutputContainer.propTypes = {
  params: PropTypes.object,
  doRequestOutput: PropTypes.func,
  outputData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doRequestOutput },
)(OutputContainer);
