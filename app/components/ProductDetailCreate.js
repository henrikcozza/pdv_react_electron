// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
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
  wrapperCol: { span: 8, offset: 4 },
};



class ProductDetailCreate extends React.Component  {
    state = {
      checkNick: false,
      moneyInput: 0,
    };
    constructor(props){
        super(props)
        this.props.createItem(this.props.form, '')
    }
    check = () => {

                // console.log(this.props.form.getFieldsValue())
                let produto = this.props.form.getFieldsValue() || ''
                this.props.createItem(this.props.form, produto)

         // }
         // else{
         //     this.props.createItem(this.props.form, '')
         //     console.log(err)
         // }
    
    }

    handleChange = (e) => {
      this.setState({
        checkNick: e.target.checked,
      }, () => {
        this.props.form.validateFields(['name'], { force: true });
      });
    }

    onChange = (value) => {
        this.check()
    }

  render() {
   const { getFieldDecorator } = this.props.form;
    return (
        <div>
          <Form.Item {...formItemLayout} label="Nome do Produto">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: 'Por favor insira o nome do produto',

              }],
            })(
              <Input
                  placeholder="Insira o nome do produto"
                  onBlur={this.onChange}
                />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Valor de venda">
              {getFieldDecorator('price', {
                rules: [{
                  required: true,
                  message: 'Por favor informe o valor de venda deste produto',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={9999.99}
                    size="large"
                    precision={2}
                    decimalSeparator=","
                    formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    onBlur={this.onChange}
                  />
                )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Valor de custo">
              {getFieldDecorator('cust', {
                rules: [{
                  required: true,
                  message: 'Por favor informe o valor de custo deste produto',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={9999.99}
                    size="large"
                    precision={2}
                    decimalSeparator=","
                    formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    onBlur={this.onChange}
                  />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Alerta de Estoque">
              {getFieldDecorator('min_stock', {
                rules: [{
                  required: true,
                  message: 'Por favor insira a quantidade minima de estoque, que o sistema usara para emiitir alerta sobre o baixo estoque do produto',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={9999}
                    size="large"
                    onBlur={this.onChange}
                  />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Estoque">
              {getFieldDecorator('stock', {
                rules: [{
                  required: true,
                  message: 'Por favor insira a quantidde em estoque do produto',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={9999}
                    size="large"
                    onBlur={this.onChange}
                  />
              )}
          </Form.Item>


        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({handleProdutos: getAllProducts}, dispatch);
}


export default connect(null, mapDispatchToProps)(Form.create()(ProductDetailCreate));
