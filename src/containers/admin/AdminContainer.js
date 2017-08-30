import React, { Component } from 'react';
import { Layout, Menu, Icon, Tabs, Breadcrumb } from 'antd';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import _ from 'lodash';

import OverviewContainer from './dashboard/OverviewContainer';
import RealtimeContainer from './dashboard/RealtimeContainer';
import OutputContainer from './dashboard/OutputContainer';
import DowntimeContainer from './dashboard/DowntimeContainer';
import AlarmContainer from './dashboard/AlarmContainer';

import background from './../../styles/body.jpg';
import serverIP from './../../constants/ipConfig.json';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

const showSideMenu = (sideMenuParams) => {
  const childArrs = [];

  _.map(sideMenuParams, (value, key) => {
    childArrs.push(
      <Menu.Item key={key}>
        <Icon type="appstore-o" />
        <span className="nav-text">{value}</span>
      </Menu.Item>
    );
  });

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
      {childArrs}
    </Menu>
  );
};

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    // TODO(JasonHsu): IP need to modify
    this.state = {
      collapsed: false,
      socket: io(serverIP.socketio),
      socketData: [],
    };

    this.toggle = this.toggle.bind(this);
    this.tabsCallback = this.tabsCallback.bind(this);
  }
  componentDidMount() {
    this.state.socket.emit('startToSendData');
    this.state.socket.on('realtimeData', (data) => {
      console.log('socket.io connect!', this.state.socketData);
      this.setState({ socketData: data });
    });
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  tabsCallback(key) {
    console.log(key);
    this.state.socket.connect();
    if (key !== '2') {
      this.state.socket.emit('endToSendData');
    } else {
      this.state.socket.emit('startToSendData');
    }
  }
  render() {
    const country = this.props.params.country;
    const factory = this.props.params.factory;
    const plant = this.props.params.plant;
    const line = this.props.params.line;

    const sideMenuParams = [line, 'ICT', 'ICT CV', 'Router'];
    return (
      <div id="admin-container">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            { showSideMenu(sideMenuParams) }
          </Sider>
          <Layout>
            <Header className="header">
               <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Breadcrumb className="barItems">
                <Breadcrumb.Item><a href={`/select-map/${country}`} className="barItems">{country}</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/select-map/Thailand/${factory}`} className="barItems">{factory}</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/select-map/Thailand/Mahachai/${plant}`} className="barItems">{plant}</a></Breadcrumb.Item>
                <Breadcrumb.Item className="barItems">{line}</Breadcrumb.Item>
              </Breadcrumb>
            </Header>
            <Content className="content" style={{ backgroundImage: `url(${background})`}}>
              <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
                <TabPane tab="Overview" key="1">
                  <OverviewContainer {...this.props} socketData={this.state.socketData} />
                </TabPane>
                <TabPane tab="Realtime" key="2">
                  <RealtimeContainer {...this.props} socketData={this.state.socketData} />
                </TabPane>
                <TabPane tab="Output" key="3">
                  <OutputContainer {...this.props} />
                </TabPane>
                <TabPane tab="Downtime" key="4">
                  <DowntimeContainer {...this.props} />
                </TabPane>
                <TabPane tab="Alarm" key="5">
                  <AlarmContainer {...this.props} />
                </TabPane>
              </Tabs>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

AdminContainer.propTypes = {
  params: PropTypes.object,
};

export default AdminContainer;
