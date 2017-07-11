import React, { Component } from 'react';
import { Layout, Menu, Icon, Tabs, Breadcrumb } from 'antd';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import OverviewContainer from './dashboard/OverviewContainer';
import SummaryContainer from './dashboard/SummaryContainer';
import OutputContainer from './dashboard/OutputContainer';
import DowntimeContainer from './dashboard/DowntimeContainer';
import AlarmContainer from './dashboard/AlarmContainer';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      socket: io('http://10.2.27.112:5002'),
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
    if (key !== '1' && key !== '2') {
      this.state.socket.emit('endToSendData');
    } else {
      console.log('xxxx');
      this.state.socket.emit('startToSendData');
    }
  }
  render() {
    const country = this.props.params.country;
    const factory = this.props.params.factory;
    const plant = this.props.params.plant;
    const line = this.props.params.line;
    return (
      <div id="admin-container">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">{`${this.props.params.line} Line`}</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">ICT</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">FCT</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">Buffer CV</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="video-camera" />
                <span className="nav-text">Transfer CV</span>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="upload" />
                <span className="nav-text">ICT CV</span>
              </Menu.Item>
              <Menu.Item key="7">
                <Icon type="user" />
                <span className="nav-text">FCT CV</span>
              </Menu.Item>
              <Menu.Item key="8">
                <Icon type="video-camera" />
                <span className="nav-text">Transfer Robot</span>
              </Menu.Item>
              <Menu.Item key="9">
                <Icon type="upload" />
                <span className="nav-text">Cleaner</span>
              </Menu.Item>
              <Menu.Item key="10">
                <Icon type="user" />
                <span className="nav-text">TIM</span>
              </Menu.Item>
              <Menu.Item key="11">
                <Icon type="video-camera" />
                <span className="nav-text">DMC</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Breadcrumb>
                <Breadcrumb.Item><a href={`/select-map/${country}`}>{country}</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/select-map/Thailand/${factory}`}>{factory}</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/select-map/Thailand/Mahachai/${plant}`}>{plant}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{line}</Breadcrumb.Item>
              </Breadcrumb>
            </Header>
            <Content className="content">
              <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
                <TabPane tab="Overview" key="1">
                  <OverviewContainer {...this.props} socketData={this.state.socketData} />
                </TabPane>
                <TabPane tab="Summary" key="2">
                  <SummaryContainer {...this.props} socketData={this.state.socketData} />
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
