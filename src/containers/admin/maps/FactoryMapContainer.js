import React, { Component } from 'react';
import G2 from 'g2';
import { Row } from 'antd';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/* eslint-disable import/extensions */
import MapJson from '../../../constants/factories.geo.json';
import styleJson from '../../../constants/stylesConfig.json';
/* eslint-enable import/extensions */

const factory = styleJson.factoryMap.factory;
const activePlant = styleJson.factoryMap.activePlant;
const inactivePlant = styleJson.factoryMap.inactivePlant;

const factoryViewColor = factory.viewColor;
const factoryStrokeColor = factory.strokeColor;
const factoryStrokeWidth = factory.strokeWidth;
const factoryBackgroundImageHeight = styleJson.factoryMap.factoryBackgroundImageHeight.Mahachai;
const activePlantViewColor = activePlant.viewColor;
const activePlantStrokeColor = activePlant.strokeColor;
const activePlantLabelColor = activePlant.labelColor;
const activePlantStrokeWidth = activePlant.strokeWidth;
const inactivePlantViewColor = inactivePlant.viewColor;
const inactivePlantStrokeColor = inactivePlant.strokeColor;
const inactivePlantLabelColor = inactivePlant.labelColor;
const inactivePlantStrokeWidth = inactivePlant.strokeWidth;

class FactoryMapContainer extends Component {
  componentDidMount() {
    this.showMap();
  }
  showMap() {
    const factoryName = this.props.params.factory;

    const Stat = G2.Stat;

    const borderWallMap = [];
    const activePlantMap = [];
    const inactivePlantMap = [];
    const mapData = MapJson[factoryName];
    const features = mapData.features;
    for (let i = 0; i < features.length; i += 1) {
      const name = features[i].properties.name;
      const isPlant = features[i].properties.isPlant;
      const isActive = features[i].properties.isActive;

      if (isPlant) {
        if (isActive) {
          activePlantMap.push({ name, isPlant, isActive });
        } else {
          inactivePlantMap.push({ name, isPlant, isActive });
        }
      } else {
        borderWallMap.push({ name, isPlant });
      }
    }

    // init the size of factoryMapChart chart
    const factoryMapChart = new G2.Chart({
      id: 'factory-map-chart',
      forceFit: true,
      width: window.innerHeight * (1600 / 2560),
      height: (window.innerHeight < factoryBackgroundImageHeight)
        ? window.innerHeight
        : factoryBackgroundImageHeight,
      syncXYScales: true,
      plotCfg: {
        margin: [55, 20],
      },
    });

    // disable legend
    factoryMapChart.legend(false);

    // draw factoryView view
    const factoryView = factoryMapChart.createView();
    factoryView.source(borderWallMap);
    factoryView.tooltip(false);
    factoryView.axis(false);
    factoryView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(factoryViewColor)
      .style({
        stroke: factoryStrokeColor,
        lineWidth: factoryStrokeWidth,
      });

    // draw active plantView view
    const activePlantView = factoryMapChart.createView();
    activePlantView.source(activePlantMap);
    activePlantView.tooltip(false);
    activePlantView.axis(false);
    activePlantView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(activePlantViewColor)
      .style({
        stroke: activePlantStrokeColor,
        lineWidth: activePlantStrokeWidth,
      });

    // draw inactive plantView view
    const inactivePlantView = factoryMapChart.createView();
    inactivePlantView.source(inactivePlantMap);
    inactivePlantView.tooltip(false);
    inactivePlantView.axis(false);
    inactivePlantView.polygon()
      .position(Stat.map.region('name', mapData))
      .color(inactivePlantViewColor)
      .style({
        stroke: inactivePlantStrokeColor,
        lineWidth: inactivePlantStrokeWidth,
      });

    // set the label of the name to the active plant
    activePlantView.point()
      .position(Stat.map.center('name', mapData))
      .size(0)
      .label('name', {
        label: {
          textAlign: 'center',
          fill: activePlantLabelColor,
          fontSize: '25',
        },
        offset: 0,
      });

    // set the label of the name to the inactive plant
    inactivePlantView.point()
      .position(Stat.map.center('name', mapData))
      .size(0)
      .label('name', {
        label: {
          textAlign: 'center',
          fill: inactivePlantLabelColor,
          fontSize: '15',
        },
        offset: 0,
      });

    // click event
    factoryMapChart.on('plotclick', (ev) => {
      /* eslint-disable no-underscore-dangle */
      const isPlant = ev.data._origin.isPlant;
      const isActive = ev.data._origin.isActive;
      if (!isPlant) { return; }
      if (!isActive) { return; }

      const currentPath = this.props.location.pathname;
      const plantName = ev.data._origin.name;
      browserHistory.push(`${currentPath}/${plantName}`);
      /* eslint-enable no-underscore-dangle */
    });

    factoryMapChart.render();
  }
  render() {
    const emptyDivHeight = (window.innerHeight < factoryBackgroundImageHeight)
      ? 0
      : ((window.innerHeight) - factoryBackgroundImageHeight) / 2;
    return (
      <div id="factory-map-container">
        <div className="factory-map-image">
          <div style={{ height: emptyDivHeight }} />
          <Row className="row" type="flex" justify="center" align="middle">
            <div className="factory-map-mask" style={{ width: '100%' }} />
            <div id="factory-map-chart" style={{ width: '50%' }} />
          </Row>
        </div>
      </div>
    );
  }
}

FactoryMapContainer.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
};

export default FactoryMapContainer;
