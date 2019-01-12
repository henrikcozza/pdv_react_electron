// @flow
import type { Action } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export const CANCELA_VENDA = 'CANCELA_VENDA';
export const REMOVE_PRODUTO = 'REMOVE_PRODUTO';
export const SET_PRODUTO = 'SET_PRODUTO';

const initialState = {
    produtos_vendidos: []
};

function totalize(lista_obj){
    var total = 0;
    for(var i = 0; i<=lista_obj.length;i++){
        total += lista_obj[i].price
        console.log('total: '+total)
    }
    return total
}

export default function produtos(state = initialState, action) {
    switch (action.type){
        case SET_PRODUTO:
        var total = totalize([...state.produtos_vendidos, action.payload]);
            return{
                ...state,
                produtos_vendidos: [...state.produtos_vendidos, action.payload],
                venda_total: total,
            };
        case REMOVE_PRODUTO:
            for(var i=0; i <= state.produtos_vendidos; i++ ){
                if( state.produtos_vendidos[i] == action.payload ){
                    return {
                        ...state,
                        produtos_vendidos: [...state.produtos_vendidos.splice(i,1)]
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
