import React, { Component } from 'react';
import { Row, Col, Card, Table, Radio, DatePicker, Button, Dropdown, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import G2 from 'g2';
import createG2 from 'g2-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { outputColumns } from './../../../constants/tableColumns';
import {
  doRequestOutputTable,
} from '../../../actions';

const { MonthPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

class OutputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'date',
      datePickerValue: moment().format('YYYY-MM-DD'),
      isSearchButtonDisable: true,
      monthDropdownValue: moment().format('YYYY'),
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.handleMonthDropdown = this.handleMonthDropdown.bind(this);
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
    const { doRequestOutputTable } = this.props;
    /* eslint-enable no-shadow */

    const filterDate = moment().format(e.target.value === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD');

    doRequestOutputTable({
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
    const { doRequestOutputTable } = this.props;
    /* eslint-enable no-shadow */

    doRequestOutputTable({
      line: this.props.params.line,
      date: this.state.datePickerValue,
      filter: this.state.filterValue,
    });
  }
  generateTableDataSource(data) {
    const arr = [];
    _.map(data, (d, idx) => {
      let yr = ((d.OutputOKCount / (d.OutputOKCount + d.OutputNGCount)) * 100).toFixed(2);

      if (isNaN(yr)) { yr = 0; }

      arr.push({
        key: idx,
        no: idx + 1,
        date: d.timeStamp,
        output: d.OutputOKCount,
        yieldRate: `${yr}%`,
      });
    });

    return arr;
  }
  generateChart(data) {
    if (!data) { return []; }
    const arr = [];
    _.map(data, (d) => {
      const yr = ((d.OutputOKCount / (d.OutputOKCount + d.OutputNGCount)) * 100);
      let yrRounding = Math.round(yr * 100) / 100;

      if (isNaN(yrRounding)) { yrRounding = 0; }

      arr.push({
        dateString: _.split(d.timeStamp, '-').join(''),
        outputCount: d.OutputOKCount,
        yieldRate: yrRounding,
      });
    });

    const Frame = G2.Frame;
    let frame = new Frame(arr);
    frame = Frame.combinColumns(frame, ['outputCount'], 'count', 'type', ['dateString', 'yieldRate']);

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
  handleMonthDropdown(e) {
    const monthOptions = ['2016', '2017'];
    this.setState({
      monthDropdownValue: monthOptions[e.key - 1],
      datePickerValue: monthOptions[e.key - 1],
      isSearchButtonDisable: !monthOptions[e.key - 1],
    });
  }
  renderPicker() {
    if (this.state.filterValue === 'year') {
      return '';
    }
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
          <Button>
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
    const { outputTableData } = this.props;

    return (
      <div id="output-container">
        <Row>
          <Col span={24} className="col">
            <Card title="Output History">
              <RadioGroup defaultValue="date" onChange={this.onFilterChange}>
                <RadioButton value="hour">Hour</RadioButton>
                <RadioButton value="date">Date</RadioButton>
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
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card title="Yield Rate Trend Chart">
              { this.generateChart(outputTableData) }
            </Card>
          </Col>
          <Col span={24} className="col">
            <Card>
              <Table
                dataSource={this.generateTableDataSource(outputTableData)}
                columns={outputColumns}
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
  doRequestOutputTable: PropTypes.func,
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
    doRequestOutputTable,
  },
)(OutputContainer);
