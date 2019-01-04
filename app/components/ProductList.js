// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, Table, Divider, Tooltip, Modal,
} from 'antd';

import { connect, Provider } from 'react-redux';
import { Redux } from 'redux';

import { bindActionCreators } from 'redux';
import { getAllProducts, updateProduct, createProduto } from '../actions/products';

import currency from 'currency-formatter';
import ProductDetailEdit from './ProductDetailEdit'
import Store from '../index'




class ProductList extends React.Component<Props>  {

    columns = [{
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Preço',
          dataIndex: 'price',
          key: 'price',
          render: text => currency.format(text, { code: 'BRL' }),
        },{
          title: 'Custo',
          dataIndex: 'cust',
          key: 'cust',
          render: text => currency.format(text, { code: 'BRL' }),
        },{
          title: 'Estoque Minimo',
          dataIndex: 'min_stock',
          key: 'min_stock',
        }, {
          title: 'Estoque',
          dataIndex: 'stock',
          key: 'stock',
      },{
          title: 'Ações',
          key: 'action',
          render: (row) => (
            <span>
                <Tooltip placement="left" title="Editar produto">
                    <Button
                        onClick= {() => {this.editFormModel(row)}}
                        type="dashed"
                        shape="circle"
                        icon="edit"
                    />
                </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="bottomRight" title="Deletar produto">
                  <Button
                      onClick={() => {this.showDeleteConfirm(row)}}
                      type="danger"
                      shape="circle"
                      icon="delete"
                    />
              </Tooltip>
            </span>
          ),
        }
    ];
    constructor(props: Props){
        super(props);
        this.props.handlerProdutos()
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
        this.editFormModel = this.editFormModel.bind(this)
        this.updateItem = this.updateItem.bind(this)
        this.store = Store
        this.state = {
          'dataEditForm': '',
          'dataEdit': ''
        };


    }

    showDeleteConfirm = (row) => {
        const atualizaLista = this.props.handlerProdutos
        Modal.confirm({
            title: 'Você tem certeza que deseja deletar este produto?',
            content: ` Produto : ${row.name} `,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk(close) {
                row.destroy()
                message.success('produto deletado', 1.5)
                atualizaLista()
                close()
            },
            onCancel() {
                console.log('Cancelou');
            },
        })
    }

    updateItem = (form, item) =>{
        console.log('executou update')
        console.log(item)
        this.state.dataEdit = item
        this.state.dataEditForm = form
    }

    editFormModel = (row) => {
        const atualizaLista = this.props.handlerProdutos
        const updateProduto = this.props.updateProduto
        const updateItem = this.updateItem
        const state = this.state;
        const  store  = this.store
        const modal = Modal
        modal.confirm({
            title: 'Editar este produto',
            content:  <ProductDetailEdit store={store} item={row} updateItem={updateItem}/>,
            width: '520px',
            okText: 'Salvar',
            okType: 'dashed',
            cancelText: 'Sair',
            centered: true,
            onOk(e) {
                state.dataEditForm.validateFields((err) => {
                    if (!err) {
                        if(state.dataEditForm.isFieldsTouched()){
                             updateProduto(row, state.dataEdit)
                             //close()
                             e()
                        }else{
                            e()
                        }

                    }else if(err){
                        state.dataEditForm.validateFields()
                        e.preventDefault;
                    }
                })
            },
            onCancel() {
                console.log('Cancelou');
            },
        })
    }



    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

  render() {
     const { produtos} = this.props
     return (
        <div>
          <Table columns={this.columns} dataSource={produtos}  />
        </div>
     );


  }

}
function mapStateToProps(state) {
  return {
    produtos: state.produtos.produtos
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
      handlerProdutos: getAllProducts,
      updateProduto: updateProduct,
      createProduto: createProduto
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
