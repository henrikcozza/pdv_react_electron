// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ReactDOM from "react-dom";
import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, AutoComplete , Table, Tooltip, Modal,
} from 'antd';

import models from '../../models/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  updateProduct, setProduct, removeProduct, cancelSell } from '../actions/sell';
import currency from 'currency-formatter';
import style from './SeilDetailList.css' ;

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
      this.showDeleteConfirm = this.showDeleteConfirm.bind(this);

      this.columns = [{
          title: 'Quantidade',
          dataIndex: 'qt',
          key: 'qt',
          editable: true
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
          title: 'SubTotal',
          dataIndex: 'price',
          key: 'price_tot',
          render: (text, obj) => currency.format( (text*obj.qt), { code: 'BRL' }),
          },
          {
          title: 'Ação',
          dataIndex: '',
          key: 'x',
          render: (row) => (
            <span>
              <Tooltip placement="bottomRight" title="Remover produto">
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

  }
  get_total(){
      var total = 0;
      for(var i =0; i<= this.props.produtos_vendidos.lenght; i++){

          total += this.props.produtos_vendidos[i].price
      }
      return total;
  }
  showDeleteConfirm = (row) => {
      const removeProduto = this.props.removeProduto
      Modal.confirm({
          title: 'Você tem certeza que deseja remover este item da lista?',
          content: ` Produto : ${row.name} `,
          okText: 'Sim',
          okType: 'danger',
          cancelText: 'Não',
          onOk(close) {
              removeProduto(row)
              message.success('produto removido', 1.5)
              close()
          },
          onCancel() {
              console.log('Cancelou');
          },
      })
  }

  render() {
      const components = {
          body: {
              row: EditableFormRow,
              cell: connect(mapStateToProps, mapDispatchToProps)(EditableCell),
          },
      };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
               return col;
             }
             return {
               ...col,
               onCell: record => ({
                 record,
                 editable: col.editable,
                 dataIndex: col.dataIndex,
                 title: col.title,
                 key: col.key
               }),
             };
       });





        return (
            <div style={style}>
                <Table
                    dataSource={this.props.produtos_vendidos}
                    columns={columns}
                    components={components}
                    rowClassName={() => 'editable-row'}

                />
                <div><b>TOTAL</b> {currency.format(this.props.venda_total, { code: 'BRL' })} </div>
            </div>
        )
    }
}

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      this.props.updateProduct({ ...record, ...values })
      handleSave({ ...record, ...values })
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      updateProduct,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
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
      cancelaVenda: cancelSell,
      updateProduct: updateProduct,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellDetailList);
