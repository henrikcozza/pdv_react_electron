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


class SellDetailAddList extends React.Component  {
  state = {
    dataSource: []
  }
  constructor(props){
      super(props);
      this.onSelect = this.onSelect.bind(this);
  }
  onSelect(value, option) {
    var instance = option.props['data-object']
    this.props.setProdutos(instance)
    console.log(instance);
    this.setState({value: ''});
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
            ],
            value: value,
        });
    })
  }
  render() {
        const onSelect = this.onSelect
        const { dataSource } = this.state;
        const {value } = this.state;
        return (
            <AutoComplete
            dataSource={dataSource.map(renderOption)}
            style={{ width: 500 }}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            value={value}
            placeholder="pesquise aqui por um produto"
          />
        )
    }
}

function mapStateToProps(state) {
  return {
    produtos_vendidos: state.venda.produtos_vendidos
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
      setProdutos: setProduct,
      removeProduto: removeProduct,
      cancelaVenda: cancelSell
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellDetailAddList   );
