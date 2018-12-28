// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import {  Layout, Menu, Icon } from 'antd';

const {
  Sider
} = Layout;

const SubMenu = Menu.SubMenu;


type Props = {};

export default class SideBar extends Component<Props> {
  props: Props;

  state = {
        collapsed: false
  }

  onCollapse = (collapsed) => {
   console.log(collapsed);
   this.setState({ collapsed });
  }

  render() {
    return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1">
                <Link to={routes.COUNTER}>
                  <Icon type="pie-chart" />
                  <span>Contador</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="2">
                <Link to={routes.HOME}>
                  <Icon type="scan" />
                  <span>Produtos</span>
                </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}
