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
                <Link to={routes.HOME}>
                    <Icon type="pie-chart" />
                    <span>Painel Principal</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="2">
                <Link to={routes.PRODUTOS}>
                  <Icon type="scan" />
                  <span>Produtos</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="3">
                <Link to={routes.SELL}>
                    <Icon type="shopping-cart"/>
                    <span>Vendas</span>
                </Link>
            </Menu.Item>

          </Menu>
        </Sider>
    );
  }
}
