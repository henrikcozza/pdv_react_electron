// @flow
import * as React from 'react';
import {  Layout, Breadcrumb} from 'antd';
import SideBar from './SideBar';
const {
  Header, Content, Footer
} = Layout;


type Props = {
  children: React.Node

};

export default class App extends React.Component<Props> {
  props: Props;

 

  render() {
    const { children } = this.props;


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <React.Fragment>{children}</React.Fragment>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>

        );
  }
}
