import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'antd/dist/antd.less';
import './styles/index.less';

import configureStore from './store/configureStore';
import LoginContainer from './containers/LoginContainer';
import WorldMapContainer from './containers/admin/maps/WorldMapContainer';
import CountryMapContainer from './containers/admin/maps/CountryMapContainer';
import FactoryMapContainer from './containers/admin/maps/FactoryMapContainer';
import PlantMapContainer from './containers/admin/maps/PlantMapContainer';
import AdminContainer from './containers/admin/AdminContainer';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const routerSet = () => {
  return (
    <Router history={history}>
      <Route path="/" component={LoginContainer} />
      <Route path="/select-map" component={WorldMapContainer} />
      <Route path="/select-map/:country" component={CountryMapContainer} />
      <Route path="/select-map/:country/:factory" component={FactoryMapContainer} />
      <Route path="/select-map/:country/:factory/:plant" component={PlantMapContainer} />
      <Route path="/admin/:country/:factory/:plant/:line" component={AdminContainer} />
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    {routerSet()}
  </Provider>,
  document.getElementById('root'),
);
