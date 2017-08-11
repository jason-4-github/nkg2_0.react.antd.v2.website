import React, { Component } from 'react';
import { Row, Col, Card, DatePicker, Button, Dropdown, Menu, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  doRequestOutputHour,
  doRequestOutputDate,
  doRequestOutputMonth,
  doRequestOutputYear,
} from '../../../actions';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class OutputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { yearValue: moment().format('YYYY') };

    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
  }
  componentDidMount() {
    const date = moment().format('YYYY-MM-DD');
    this.doSearch('all', date);
  }
  // do the date or hour action
  onDatePickerChange(date, dateString) {
    const isMonth = dateString.split('-').length === 2 || false;
    this.doSearch( isMonth ? 'date' : 'hour', dateString);
  }
  doSearch(type, onChangeValue) {
    /* eslint-disable no-shadow */
    const {
      doRequestOutputHour,
      doRequestOutputDate,
      doRequestOutputMonth,
      doRequestOutputYear,
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
    }

    // the function config the different actionType
    const defaultObjsFunc = (type, defaultobjs) => {
      defaultobjs.actionType = type;
      return defaultobjs;
    }

    // call action with type
    if (type === 'hour') doRequestOutputHour(defaultObjsFunc('hour', defaultobjs));
    else if (type ==='date') doRequestOutputDate(defaultObjsFunc('date', defaultobjs));
    else if (type === 'month') doRequestOutputMonth(defaultObjsFunc('month', defaultobjs));
    else {
      doRequestOutputHour(defaultObjsFunc('hour', defaultobjs));
      doRequestOutputDate(defaultObjsFunc('date', defaultobjs));
      doRequestOutputMonth(defaultObjsFunc('month', defaultobjs));
      doRequestOutputYear(defaultObjsFunc('year', defaultobjs));
    }
  }
  generateChart(data, type, actionType) {
    if (!data) { return []; }

    // determine the animate active or not
    const actionTypeSplit = actionType.split('_');
    const animate = actionTypeSplit[3] === 'REQUEST' ?  '' : actionTypeSplit[2].toLowerCase();

    const arr = [];
    _.map(data, (d) => {
      const yr = ((d.okQuantity / (d.okQuantity + d.ngQuantity)) * 100);
      let yrRounding = Math.round(yr * 100) / 100;
      let timeString = d.time + '';

      if (isNaN(yrRounding)) { yrRounding = 0; }

      if (type === 'hour') timeString = _.split(d.time, ':')[0];
      else if (type === 'date') timeString = _.split(d.time, '/')[1];

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
      if(animate !== type)chart.animate(false);
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
  handleMonthDropdown(e) {
    const monthOptions = ['2016', '2017'];
    this.doSearch('month', monthOptions[e.key - 1]);
    this.setState({ yearValue: monthOptions[e.key - 1] });
  }
  renderPicker(type) {
    if (type === 'year') {
      return '';
    }
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
    const {
      outputHourData, outputDateData, outputMonthData, outputYearData, type
    } = this.props;
    const actionTypeSplit = type.split('_');
    let hourRequestSpin, dateRequestSpin, monthRequestSpin, yearRequestSpin;
    if ( actionTypeSplit[3] === 'REQUEST') {
      hourRequestSpin = actionTypeSplit[2] === 'HOUR' || false;
      dateRequestSpin = actionTypeSplit[2] === 'DATE' || false;
      monthRequestSpin = actionTypeSplit[2] === 'MONTH' || false;
      yearRequestSpin = actionTypeSplit[2] === 'YEAR' || false;
    }

    return (
      <div id="output-container">
        <Row gutter={10}>
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
                    { this.renderPicker() }
                  </Col>
                </Row>
              }
            >
              { outputHourData !== undefined && !hourRequestSpin
                ? this.generateChart(outputHourData, 'hour', type)
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
              { outputMonthData !== undefined && !monthRequestSpin
                ? this.generateChart(outputMonthData, 'month', type)
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
              { outputDateData !== undefined && !dateRequestSpin
                ? this.generateChart(outputDateData, 'date', type)
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
                      Year
                    </h3>
                  </Col>
                </Row>
              }
            >
              { outputYearData !== undefined && !yearRequestSpin
                ? this.generateChart(outputYearData, 'year', type)
                : <div className="defaultChartDiv">
                    <div className="emptyDiv" />
                    <Spin />
                  </div>
              }
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

OutputContainer.propTypes = {
  params: PropTypes.object,
  doRequestOutputHour: PropTypes.func,
  doRequestOutputDate: PropTypes.func,
  doRequestOutputMonth: PropTypes.func,
  doRequestOutputYear: PropTypes.func,
  outputTableData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doRequestOutputHour,
    doRequestOutputDate,
    doRequestOutputMonth,
    doRequestOutputYear,
  },
)(OutputContainer);
