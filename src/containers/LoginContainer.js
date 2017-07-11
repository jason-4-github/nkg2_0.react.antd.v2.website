import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Row, Card } from 'antd';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.doClickLogin = this.doClickLogin.bind(this);
  }
  doClickLogin() {
    browserHistory.push('/select-map');
  }
  render() {
    return (
      <div id="login-container">
        <Row className="row" type="flex" justify="center" align="middle">
          <Card>
            <h1>NKG 2.0</h1>
            <Form className="login-form">
              <Input
                className="login-form-input"
                prefix={<Icon type="user" className="input-icon" />}
                placeholder="Username"
              />
              <Input
                className="login-form-input"
                prefix={<Icon type="lock" className="input-icon" />}
                type="password"
                placeholder="Password"
              />
              <Button
                className="login-form-button"
                type="primary"
                htmlType="submit"
                onClick={this.doClickLogin}
              >Log in</Button>
            </Form>
          </Card>
        </Row>
      </div>
    );
  }
}

export default LoginContainer;
