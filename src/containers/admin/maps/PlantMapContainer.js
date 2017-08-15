// Mahachai Plant2
// http://geojson.io/#id=gist:anonymous/ee9af0793bedcc203d4a8ec698b25cb5&map=2/64.9/134.3
// Mahachai Plant3
// http://geojson.io/#id=gist:anonymous/e14a50946e5f39a6c48101892339099f&map=2/50.1/-55.9

import React, { Component } from 'react';
// import { connect } from 'react-redux';
import G2 from 'g2';
import { connect } from 'react-redux';
import { Row, Spin } from 'antd';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/* eslint-disable import/extensions */
import { doRequestMapConnect, doRequestForPlantMap } from '../../../actions/index';
import styleJson from '../../../constants/stylesConfig.json';
/* eslint-enable import/extensions */

const plant = styleJson.plantMap.plant;
const activeLine = styleJson.plantMap.activeLine;
const inacitveLine = styleJson.plantMap.inactiveLine;
const disconnectLine = styleJson.plantMap.disconnectLine;

const plantViewColor = plant.viewColor;
const plantStrokeColor = plant.strokeColor;
const plantStrokeWidth = plant.strokeWidth;
const activeLineViewColor = activeLine.viewColor;
const activeLineStrokeColor = activeLine.strokeColor;
const activeLineLabelColor = activeLine.labelColor;
const activeLineStrokeWidth = activeLine.strokeWidth;
const inactiveLineViewColor = inacitveLine.viewColor;
const inactiveLineStrokeColor = inacitveLine.strokeColor;
const inactiveLineLabelColor = inacitveLine.labelColor;
const inactiveLineStrokeWidth = inacitveLine.strokeWidth;
const disconnectLineViewColor = disconnectLine.viewColor;
const disconnectLineStrokeColor = disconnectLine.strokeColor;
const disconnectLineLabelColor = disconnectLine.labelColor;
const disconnectLineStrokeWidth = disconnectLine.strokeWidth;

class PlantMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRender: false,
    };
  }
  componentWillMount() {
    /* eslint-disable no-shadow */
    const { doRequestMapConnect, doRequestForPlantMap } = this.props;
    /* eslint-enable no-shadow */
    const plantName = this.props.params.plant;
    const factoryName = this.props.params.factory;

    doRequestMapConnect({ plant: plantName });
    doRequestForPlantMap({ plant: plantName, factory: factoryName });
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.connectStatus === this.props.connectStatus) return;
    // if (nextProps.plantMapData === this.props.plantMapData) return;
    if (nextProps.connectStatus && nextProps.plantMapData)
      this.showMap(nextProps.connectStatus, nextProps.plantMapData);
  }
  showMap(statusArrs, plantMapData) {
    if (!statusArrs || !plantMapData || !plantMapData.features) return;

    const Stat = G2.Stat;

    const plantName = this.props.params.plant;
    const factoryName = this.props.params.factory;

    const borderWallMap = [];
    const activeLineMap = [];
    const inactiveLineMap = [];
    const disconnectLinMap = [];
    const mapData = plantMapData;
    const features = mapData.features;

    for (let i = 0; i < features.length; i += 1) {
      const name = features[i].properties.name;
      const isLine = features[i].properties.isLine;
      const isActive = features[i].properties.isActive;
      let disconnect = false;
      _.map(statusArrs, (value) => {
        _.map(value, (innerValue, key) => {
          if (name === key) disconnect = !innerValue;
        });
      });

      if (isLine) {
        if (isActive) {
          if (disconnect) {
            disconnectLinMap.push({ name, isLine, isActive });
          } else {
            activeLineMap.push({ name, isLine, isActive });
          }
        } else {
          inactiveLineMap.push({ name, isLine, isActive });
        }
      } else {
        borderWallMap.push({ name, isLine });
      }
    }

    // init the size of plantMapChart chart
    const plantMapChart = new G2.Chart({
      id: 'plant-map-chart',
      forceFit: true,
      width: window.innerHeight * (1600 / 2560),
      height: window.innerHeight,
      syncXYScales: true,
      aspectScale: 1,
      plotCfg: {
        margin: [55, 20],
      },
    });

    // set the map coordination
    plantMapChart.coord('map', {
      projection: 'mercator',
      max: [250, 150],
      min: [-250, -100],
    });

    // disable legend
    plantMapChart.legend(false);

    // draw plantView view
    const plantView = plantMapChart.createView();
    plantView.source(borderWallMap);
    plantView.tooltip(false);
    plantView.axis(false);
    plantView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(plantViewColor)
      .style({
        stroke: plantStrokeColor,
        lineWidth: plantStrokeWidth,
      });

    // draw acitve lineView view
    const activeLineView = plantMapChart.createView();
    activeLineView.source(activeLineMap);
    activeLineView.tooltip(false);
    activeLineView.axis(false);
    activeLineView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(activeLineViewColor)
      .style({
        stroke: activeLineStrokeColor,
        lineWidth: activeLineStrokeWidth,
      });

    // draw inacitve lineView view
    const inactiveLineView = plantMapChart.createView();
    inactiveLineView.source(inactiveLineMap);
    inactiveLineView.tooltip(false);
    inactiveLineView.axis(false);
    inactiveLineView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(inactiveLineViewColor)
      .style({
        stroke: inactiveLineStrokeColor,
        lineWidth: inactiveLineStrokeWidth,
      });

    // draw disconnect lineView view
    const disconnectLineView = plantMapChart.createView();
    disconnectLineView.source(disconnectLinMap);
    disconnectLineView.tooltip(false);
    disconnectLineView.axis(false);
    disconnectLineView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(disconnectLineViewColor)
      .style({
        stroke: disconnectLineStrokeColor,
        lineWidth: disconnectLineStrokeWidth,
      });

    // set the label of the name to the active line
    activeLineView.point()
      .position(Stat.map.center('name', mapData))
      .size(0)
      .label('name', {
        label: {
          textAlign: 'center',
          fill: activeLineLabelColor,
          fontSize: '15',
        },
        offset: 0,
      });

    // set the label of the name to the inactive line
    inactiveLineView.point()
      .position(Stat.map.center('name', mapData))
      .size(0)
      .label('name', {
        label: {
          textAlign: 'center',
          fill: inactiveLineLabelColor,
          fontSize: '15',
        },
        offset: 0,
      });

    // set the label of the name to the disconnect line
    disconnectLineView.point()
      .position(Stat.map.center('name', mapData))
      .size(0)
      .label('name', {
        label: {
          textAlign: 'center',
          fill: disconnectLineLabelColor,
          fontSize: '15',
        },
        offset: 0,
      });

    // click event
    plantMapChart.on('plotclick', (ev) => {
      /* eslint-disable no-underscore-dangle */
      const isLine = ev.data._origin.isLine;
      const isActive = ev.data._origin.isActive;
      if (!isLine) { return; }
      if (!isActive) { return; }

      const countryName = this.props.params.country;
      const lineName = ev.data._origin.name;
      browserHistory.push(`/admin/${countryName}/${factoryName}/${plantName}/${lineName}`);
      /* eslint-enable no-underscore-dangle */
    });

    plantMapChart.render();
  }
  render() {
    const { connectStatus, plantMapData } = this.props;
    return (
      <div id="plant-map-container">
        <Row className="row" type="flex" justify="center" align="middle">
          { connectStatus === undefined || plantMapData === undefined
            ?
              <div id="plant-map-chart" style={{ width: '100%', textAlign: 'center' }}>
                <Row type="flex" justify="space-around" align="middle" style={{ width: '100%', height: '100vh' }}>
                  <Spin size="large" />
                </Row>
              </div>
            : <div id="plant-map-chart" style={{ width: '100%' }} />
          }
        </Row>
      </div>
    );
  }
}

PlantMapContainer.propTypes = {
  params: PropTypes.object,
  doRequestMapConnect: PropTypes.func,
  doRequestForPlantMap: PropTypes.func,
  connectStatus: PropTypes.array,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doRequestMapConnect,
    doRequestForPlantMap,
  },
)(PlantMapContainer);
