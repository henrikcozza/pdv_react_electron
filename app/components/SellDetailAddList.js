// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, AutoComplete ,
} from 'antd';

import models from '../../models/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProducts, updateProduct, createProduto } from '../actions/products';
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
function onSelect(value) {
  console.log('onSelect');
}

function renderOption(item) {
  return (
    <Option key={item.id} text={item.name}>
      {item.name}
      <span className="global-search-item-count" style={priceStyle}> {currency.format(item.price, { code: 'BRL' })} </span>
    </Option>
  );
}


class SellDetailAddList extends React.Component  {
  state = {
    dataSource: [],
  }
  handleSearch = (value) => {

    models.Products.findAll({ where:
       {$or: [
           { name:
               { $like : '%'+value +'%'},
           },

            {
                id: { $like : '%'+value +'%'},
            }
        ]
      }
     }).then(products => {
        var produtos =[];

        products.forEach(function (value) {
            produtos.push(value.dataValues)
        });

        this.setState({
            dataSource: !value ? [] : [
                ...produtos,
            ]
        });
    })
  }
  render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
            dataSource={dataSource.map(renderOption)}
            style={{ width: 500 }}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            placeholder="pesquise aqui por um produto"
          />
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(SellDetailAddList   );
