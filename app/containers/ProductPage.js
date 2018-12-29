import React from "react";
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber,
} from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
  state = {
    checkNick: false,
    moneyInput: 0,
  };

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }

  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked,
    }, () => {
      this.props.form.validateFields(['name'], { force: true });
    });
  }

  onChange = (value) => {
   console.log('changed', value);
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
            <Input placeholder="Insira o nome do produto" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Valor de venda">

                <InputNumber
                  defaultValue={0.00}
                  min={0}
                  max={9999.99}
                  size="large"
                  precision={2}
                  decimalSeparator=","
                  formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                  parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                  onChange={this.onChange}
                />

        </Form.Item>
        <Form.Item {...formItemLayout} label="Valor de custo">

                <InputNumber
                  defaultValue={0.00}
                  min={0}
                  max={9999.99}
                  size="large"
                  precision={2}
                  decimalSeparator=","
                  formatter={value => `R$ ${value}`.replace(/^R\$?\d+((.\d{3})+)?(\,\d+)?$/)}
                  parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                  onChange={this.onChange}
                />

        </Form.Item>
        <Form.Item {...formItemLayout} label="Estoque Minimo">

                <InputNumber
                  defaultValue={0}
                  min={0}
                  max={9999}
                  size="large"
                  onChange={this.onChange}
                />

        </Form.Item>
        <Form.Item {...formItemLayout} label="Estoque">

                <InputNumber
                  defaultValue={0}
                  min={0}
                  max={9999}
                  size="large"
                  onChange={this.onChange}
                />

        </Form.Item>

        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            Cadastrar Produto
          </Button>
        </Form.Item>
      </div>
    );
  }
}

const ProductPage = Form.create()(DynamicRule);

export default ProductPage
