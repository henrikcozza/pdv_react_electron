// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, Table, Divider, Tooltip, Modal,
} from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerProdutos } from '../actions/products';

class ProductList extends React.Component  {
    columns = [{
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Preço',
          dataIndex: 'price',
          key: 'price',
        },{
          title: 'Custo',
          dataIndex: 'cust',
          key: 'cust',
        },{
          title: 'Estoque Minimo',
          dataIndex: 'min_stock',
          key: 'min_stock',
        }, {
          title: 'Estoque',
          dataIndex: 'stock',
          key: 'stock',
      },{
          title: 'Action',
          key: 'action',
          render: (row) => (
            <span>
                <Tooltip placement="left" title="Editar produto">
                    <Button
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

    constructor(props){
        super(props);
        this.props.handleProdutos()
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    }

    showDeleteConfirm = (row) => {
        const atualizaLista = this.props.handleProdutos
        Modal.confirm({
            title: 'Você tem certeza que deseja deletar este produto?',
            content: ` Produto : ${row.name} `,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk(close) {

                row.destroy()
                atualizaLista()
                close()
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
     const { produtos } = this.props
     return (
         <Table columns={this.columns} dataSource={produtos} />
     );


  }
}

function mapStateToProps(state) {
 console.log(state)
  return {
    produtos: state.produtos.produtos
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({handleProdutos: handlerProdutos}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
