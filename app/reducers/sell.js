// @flow
import type { Action } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export const CANCELA_VENDA = 'CANCELA_VENDA';
export const REMOVE_PRODUTO = 'REMOVE_PRODUTO';
export const SET_PRODUTO = 'SET_PRODUTO';
export const UPDATE_PRODUTO = 'UPDATE_PRODUTO';

import {
  Form, Input, Col, Button, Checkbox, InputNumber, message, AutoComplete ,
} from 'antd';

const initialState = {
    produtos_vendidos: []
};

function totalize(lista_obj){
    var total = 0;
    for(var i = 0; i<lista_obj.length;i++){
        total += lista_obj[i].price * lista_obj[i].qt
        console.log('total: '+total)
    }
    return total
}

export default function produtos(state = initialState, action) {
    switch (action.type){
        case UPDATE_PRODUTO:
            if(state.produtos_vendidos.length){
                for(var i=0; i < state.produtos_vendidos.length; i++ ){
                    if(state.produtos_vendidos[i].id == action.payload.id ){
                        state.produtos_vendidos[i] = {...state.produtos_vendidos[i], ...action.payload}
                        var total = totalize([...state.produtos_vendidos]);
                        return{
                            ...state,
                            produtos_vendidos: [...state.produtos_vendidos],
                            venda_total: total,
                        };

                    }
                }
            }

          return state

        case SET_PRODUTO:
            if(state.produtos_vendidos.length){
                for(var i=0; i < state.produtos_vendidos.length; i++ ){
                    if(state.produtos_vendidos[i].id == action.payload.id ){
                        message.error('produto já inserido', 1.5)
                        return{
                            ...state,
                        }
                    }
                }
                var total = totalize([...state.produtos_vendidos, action.payload]);
                return{
                    ...state,
                    produtos_vendidos: [...state.produtos_vendidos, action.payload],
                    venda_total: total,
                };

            }else{
                var total = totalize([...state.produtos_vendidos, action.payload]);
                return{
                    ...state,
                    produtos_vendidos: [...state.produtos_vendidos, action.payload],
                    venda_total: total,
                };

            }

        case REMOVE_PRODUTO:

            if(  state.produtos_vendidos.length == 1){
                return {
                    ...state,
                    produtos_vendidos: [],
                    venda_total: 0,
                }
            }else{
                for(var i=0; i < state.produtos_vendidos.length; i++ ){
                    if( state.produtos_vendidos[i].id == action.payload.id ){
                        state.produtos_vendidos.splice(i,1)
                        var total = totalize([...state.produtos_vendidos]);
                        return {
                            ...state,
                            produtos_vendidos: [...state.produtos_vendidos],
                            venda_total: total,
                        }
                    }
                }
            }
            return state;

        case CANCELA_VENDA:
            return{
                ...state,
                produtos_vendidos:[...initialState.produtos_vendidos]
            };
        default:
            return state;
    }
}
