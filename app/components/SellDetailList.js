// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, AutoComplete , Table
} from 'antd';

import models from '../../models/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProduct, removeProduct, cancelSell } from '../actions/sell';
import currency from 'currency-formatter';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
const priceStyle = {
    float: 'right',
    color: 'red',
}


function renderOption(item) {
  return (
    <Option key={item.id} text={item.name} data-object={item}>
      {item.name}
    </Option>
  );
}


class SellDetailList extends React.Component  {

  constructor(props){
      super(props);
  }
  get_total(){
      var total = 0;
      for(var i =0; i<= this.props.produtos_vendidos.lenght; i++){

          total += this.props.produtos_vendidos[i].price
      }
      return total;
  }

  render() {
        const columns = [{
            title: 'Quantidade',
            dataIndex: 'qt',
            key: 'qt',
            },
            {
            title: 'Produto',
            dataIndex: 'name',
            key: 'name',
            }, {
            title: 'Valor unitário',
            dataIndex: 'price',
            key: 'price',
            render: text => currency.format(text, { code: 'BRL' }),
            },
            {
            title: 'SubTotal ',
            dataIndex: 'price',
            key: 'price_tot',
            render: text => currency.format((text*10), { code: 'BRL' }),
            }
        ];

        return (
            <div>
                <Table dataSource={this.props.produtos_vendidos} columns={columns} />
                <div><b>TOTAL</b> {currency.format(this.props.venda_total, { code: 'BRL' })} </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    produtos_vendidos: state.venda.produtos_vendidos,
    venda_total: state.venda.venda_total
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
      setProdutos: setProduct,
      removeProduto: removeProduct,
      cancelaVenda: cancelSell
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellDetailList);
