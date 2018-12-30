// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, Table
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
        }
    ];

    constructor(props){
        super(props);
        this.props.handleProdutos()
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
