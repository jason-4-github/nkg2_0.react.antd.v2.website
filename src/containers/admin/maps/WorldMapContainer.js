import React, { Component } from 'react';
import G2 from 'g2';
import { browserHistory } from 'react-router';

/* eslint-disable import/extensions */
import MapJson from '../../../constants/countries.geo.json';
import styleJson from '../../../constants/stylesConfig.json';
/* eslint-enable import/extensions */

const worldMap = styleJson.worldMap;

const backgroundColor = worldMap.backgroundColor;
const worldMapStrokeColor = worldMap.strokeColor;
const worldMapStrokeWidth = worldMap.strokeWidth;
const highlightCountryColor = worldMap.highlightColor;

class WorldMapContainer extends Component {
  componentDidMount() {
    this.showMap();
  }
  showMap() {
    const Frame = G2.Frame;
    const Stat = G2.Stat;

    const highlightCountries = [
      { name: 'Thailand' },
    ];
    const highlightCountriesFrame = new Frame(highlightCountries);

    highlightCountriesFrame.addCol('highlight', (obj) => {
      return (obj.name === 'Thailand') ? 1 : 0;
    });

    const map = [];
    const mapData = MapJson;
    const features = mapData.features;
    for (let i = 0; i < features.length; i += 1) {
      const name = features[i].properties.name;
      map.push({
        name,
      });
    }

    // init the size of worldMapChart chart
    const worldMapChart = new G2.Chart({
      id: 'world-map-chart',
      forceFit: true,
      width: window.innerHeight * (1600 / 2560),
      height: window.innerHeight,
      syncXYScales: true,
      plotCfg: {
        margin: [55, 20],
      },
    });

    // set the location of the legend
    worldMapChart.legend('highlight', {
      position: 'left',
    });

    // draw worldMapChart view
    const worldMapView = worldMapChart.createView();
    worldMapView.source(map);
    worldMapView.tooltip(false);
    worldMapView.polygon()
      .position(Stat.map.region('name', mapData))
      .shape('stroke').style({
        fill: backgroundColor,
        stroke: worldMapStrokeColor,
        lineWidth: worldMapStrokeWidth,
      });

    // draw the data on worldMapChart
    const dataView = worldMapChart.createView();
    dataView.source(highlightCountriesFrame, {
      highlight: {
        type: 'cat',
        alias: '',
        values: '',
      },
    });
    dataView.polygon()
      .position(Stat.map.region('name', mapData))
      .tooltip('name')
      .color('highlight', () => {
        return highlightCountryColor;
      });

    // render worldMapChart chart on the browser
    worldMapChart.render();

    // click event
    worldMapChart.on('plotclick', (ev) => {
      /* eslint-disable no-underscore-dangle */
      const countryName = ev.data._origin.name;

      if (countryName === 'Thailand') {
        browserHistory.push(`/select-map/${countryName}`);
      }
      /* eslint-enable no-underscore-dangle */
    });
  }
  render() {
    return (
      <div id="world-map-container">
        <div id="world-map-chart" style={{ width: '100%' }} />
      </div>
    );
  }
}

export default WorldMapContainer;
