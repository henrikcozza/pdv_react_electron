import React from "react";
import ProductDetailCreate from '../components/ProductDetailCreate';
import SellDetailAddList from '../components/SellDetailAddList';
import SellDetailList from '../components/SellDetailList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerRouteName } from '../actions/routeName'
import Store from '../index'
import { getAllProducts, createProduto } from '../actions/products';
import { Tabs, Button, Row, Col, Modal, message } from 'antd';

const TabPane = Tabs.TabPane;

class SellPage extends React.Component {
  constructor(props){
      super(props);
      this.props.handleName('Ponto de Venda')
      this.store = Store
      this.state = {
          'dataCreateForm': '',
          'dataCreate': ''
      };
  }

  createItem = (form, item) =>{
      console.log('executou create')
      console.log(item)
      this.state.dataCreateForm = form
      this.state.dataCreate = item

  }

  createFormModel = () => {
      const atualizaLista = this.props.getAllProducts
      const createProduto = this.props.createProduto
      const  store  = this.store
      const state = this.state;
      const modal = Modal
      modal.confirm({
          title: 'Cadastrar produto',
          content:  <ProductDetailCreate store={store} createItem={this.createItem}/>,
          width: '520px',
          okText: 'Salvar',
          okType: 'dashed',
          cancelText: 'Sair',
          centered: true,
          onOk(evento) {

              state.dataCreateForm.validateFields(
                (err) => {
                  if (!err) {
                      createProduto(state.dataCreate)
                      state.dataCreateForm.resetFields()
                      //close()
                      evento()

                  }
              })
          },
          onCancel() {
              console.log('Cancelou');
          },
      })
  }

  render() {
      const state = this.state;

    return (
        <div className="card-container">

                <SellDetailAddList/>

                <SellDetailList/>

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
  return bindActionCreators({
      handleName: handlerRouteName,
      getAllProducts: getAllProducts,
      createProduto: createProduto,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
