import React, { Component } from 'react';
import G2 from 'g2';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { doRequestForWorldMap } from './../../../actions';

/* eslint-disable import/extensions */
import styleJson from '../../../constants/stylesConfig.json';
/* eslint-enable import/extensions */

const countryMap = styleJson.countryMap;

const backgroundColor = countryMap.backgroundColor;
const countryMapStrokeColor = countryMap.strokeColor;
const countryMapStrokeWidth = countryMap.strokeWidth;
const highlightCountryColor = countryMap.highlightColor;
const factoryLocationColor = countryMap.factoryLocationColor;

const factoryLocations = [
  {
    name: 'Mahachai',
    lant: 13.62,
    long: 100.29,
    circleSize: 5,
    isFactory: true,
  },
  {
    name: 'Petchaburi',
    lant: 13.26,
    long: 99.82,
    circleSize: 5,
    isFactory: true,
  },
];

class CountryMapContainer extends Component {
 componentDidMount() {
    const { doRequestForWorldMap } = this.props;
    doRequestForWorldMap();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.worldMapData === this.props.worldMapData) return;
    if (nextProps.worldMapData.length !== 0) {
      this.setState({ isSpin: false });
      this.showMap(nextProps.worldMapData);
    } else {
      this.setState({ isSpin: true });
    }

  }
  showMap(worldMapData) {
    console.log('cccc', this.props.children);
    const countryName = this.props.params.country;

    const Stat = G2.Stat;

    const map = [];
    const mapData = worldMapData;
    const features = mapData.features;
    for (let i = 0; i < features.length; i += 1) {
      const name = features[i].properties.name;
      map.push({
        name,
      });
    }

    // init the size of countryMapChart chart
    const countryMapChart = new G2.Chart({
      id: 'country-map-chart',
      forceFit: true,
      width: window.innerHeight * (1600 / 2560),
      height: window.innerHeight,
      syncXYScales: true,
      plotCfg: {
        margin: [55, 20],
      },
    });

    // set the location of the legend
    countryMapChart.legend({
      position: 'left',
    });
    countryMapChart.legend(false);
    countryMapChart.coord('map', {
      projection: 'albers',
      basic: [98, 0, -40, 0], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
      max: [36.573, -23.613], // 指定投影后最大的坐标点
      min: [-25.187, -49.739], // 指定投影后最小的坐标点
    });
    countryMapChart.tooltip({
      title: null,
    });

    // draw countryMapChart view
    const bgView = countryMapChart.createView();
    bgView.source(map);
    bgView.tooltip(false);
    bgView.axis(false);
    bgView.polygon()
      .position(Stat.map.region('name', mapData))
      .color('name', (val) => {
        if (val === countryName) {
          return highlightCountryColor;
        }
        return backgroundColor;
      })
      .style({
        stroke: countryMapStrokeColor,
        lineWidth: countryMapStrokeWidth,
      });

    // add circles for showing locations of the factories
    const pointView = countryMapChart.createView();
    pointView.source(factoryLocations);
    pointView.point()
      .position(Stat.map.location('long*lant'))
      .size('circleSize', 5, 0)
      .color(factoryLocationColor)
      .tooltip('name')
      .shape('circle')
      .style({
        shadowBlur: 20,
        shadowColor: factoryLocationColor,
      });

    // click event
    countryMapChart.on('plotclick', (ev) => {
      /* eslint-disable no-underscore-dangle */
      const isFactory = ev.data._origin.isFactory;
      if (!isFactory) { return; }

      const currentPath = this.props.location.pathname;
      const factoryName = ev.data._origin.name;
      browserHistory.push(`${currentPath}/${factoryName}`);
      /* eslint-enable no-underscore-dangle */
    });

    countryMapChart.render();
  }
  render() {
    return (
      <div id="country-map-container">
        <div id="country-map-chart" style={{ width: '100%' }} />
      </div>
    );
  }
}

CountryMapContainer.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doRequestForWorldMap },
)(CountryMapContainer);
