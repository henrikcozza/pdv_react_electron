// @flow
import type { Action } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export const GET_ALL_PRODUTOS = 'GET_ALL_PRODUTOS';
export const UPDATE_PRODUTO = 'UPDATE_PRODUTO';

const initialState = {
    produtos: []
};

export default function produtos(state = initialState, action) {
    switch (action.type){
        case GET_ALL_PRODUTOS:
            return{
                ...state,
                produtos: action.payload
            };
        case UPDATE_PRODUTO:
            return state;
        default:
            return state;
    }
}
