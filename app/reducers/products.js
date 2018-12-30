// @flow
export const GET_ALL_PRODUTOS = 'GET_ALL_PRODUTOS';
import type { Action } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';


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
        default:
            return state;
    }
}
