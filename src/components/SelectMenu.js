import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

const Option = Select.Option;

class SelectMenu extends Component {
  render() {
    const { options, styleName, onChangeFunc, container } = this.props;
    const optionArrs = [];
    const defaultValue = options ? options[0] : '';

    _.map(options, (value) => {
      optionArrs.push(
        <Option key={value} value={value.toLowerCase()}>{value}</Option>
      );
    });

    return (
      <Select key={container+defaultValue} defaultValue={defaultValue} className={styleName} onChange={onChangeFunc}>
        {optionArrs}
      </Select>
    );
  }
}

export default SelectMenu;