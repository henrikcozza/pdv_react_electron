import React from "react";
import ProductDetail from '../components/ProductDetail';
import ProductList from '../components/ProductList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerRouteName } from '../actions/routeName'

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class ProductPage extends React.Component {
  constructor(props){
      super(props);
      this.props.handleName('Produtos')
  }
  render() {

    return (
        <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Lista de produtos" key="1">
                <ProductList/>
              </TabPane>
              <TabPane tab="Cadastrar produto" key="2">
                <ProductDetail/>
              </TabPane>
            </Tabs>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
