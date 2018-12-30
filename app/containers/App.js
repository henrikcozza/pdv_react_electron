// @flow
import * as React from 'react';
import {  Layout, Icon, Breadcrumb} from 'antd';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerRouteName } from '../actions/routeName'
import HeaderBar from '../components/HeaderBar'

const {
  Header, Content, Footer
} = Layout;


type Props = {
    children: React.Node
};


class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children, routeName } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout>
          <HeaderBar/>
          <Content style={{ margin: '0 16px' }}>
              <br/>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <React.Fragment>{children}</React.Fragment>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Design ©2019 Created by Conza
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    routeName: state.routeName.routeName
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({handleName: handlerRouteName}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
