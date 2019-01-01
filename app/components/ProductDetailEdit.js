// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {createForm} from 'rc-form';
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message,
} from 'antd';

import models from '../../models/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProducts } from '../actions/products';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 2, offset: 1 },
};



class ProductDetailEdit extends React.Component  {
    state = {
      checkNick: false,
      moneyInput: 0,
    };
    constructor(props){
        super(props);
        try {
            let a = this.props.item
        }
        catch{
            console.error('prop item não foi informado')
        }
        this.onChange = this.onChange.bind(this)
    }

    check = (e) => {
      this.props.form.validateFields(
        (err) => {
            let produto = this.props.form.getFieldsValue()
            console.log(this.props.form)
            this.props.updateItem(produto)
            this.props.handlerProdutos()
        });
    }

    handleChange = (e) => {
      this.setState({
        checkNick: e.target.checked,
      }, () => {
        this.props.form.validateFields(['name'], { force: true });
      });
    }

    onChange = (value) => {
        console.log(value)
        this.check()
    }

  render() {
   const { getFieldDecorator } = this.props.form;
   const produto = this.props.item
    return (
        <div>
         <Form layout="vertical">
          <Form.Item {...formItemLayout} label="Nome do Produto">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: 'Por favor insira o nome do produto',
              }],
              initialValue: produto.name,
            })(
              <Input
                  placeholder="Insira o nome do produto"
                  onBlur={(e) => this.check(e) }

              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Valor de venda">
              {getFieldDecorator('price', {
                rules: [{
                  required: true,
                  message: 'Por favor informe o valor de venda deste produto',
                  }],
                  initialValue:produto.price
                })(
                  <InputNumber
                    min={0}
                    max={9999.99}
                    size="large"
                    onBlur={this.check}
                    precision={2}
                    decimalSeparator=","
                    formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                  />
                )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Valor de custo">
              {getFieldDecorator('cust', {
                rules: [{
                  required: true,
                  message: 'Por favor informe o valor de custo deste produto',
                  }],
                  initialValue:produto.cust
                })(
                  <InputNumber
                    min={0}
                    max={9999.99}
                    size="large"
                    onBlur={this.check}
                    precision={2}
                    decimalSeparator=","
                    formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                  />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Alerta de Estoque">
              {getFieldDecorator('min_stock', {
                rules: [{
                  required: true,
                  message: 'Por favor insira a quantidade minima de estoque, que o sistema usara para emiitir alerta sobre o baixo estoque do produto',
                  }],
                  initialValue:produto.min_stock
                })(
                  <InputNumber
                    min={0}
                    max={9999}
                    size="large"
                    onBlur={this.check}
                  />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Estoque">
              {getFieldDecorator('stock', {
                rules: [{
                  required: true,
                  message: 'Por favor insira a quantidade em estoque do produto',
                  }],
                  initialValue:produto.stock
                })(
                  <InputNumber
                    min={0}
                    max={9999}
                    size="large"
                    onBlur={this.check}

                  />
              )}
          </Form.Item>

      </Form>
  </div>
    );
  }
}


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({handlerProdutos: getAllProducts}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductDetailEdit));
// export default ProductDetail
