// @flow
export const UPDATE_ROUTE_NAME = 'UPDATE_ROUTE_NAME';
import type { Action } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const initialState = {
    routeName: 'Home'
};

export default function routeName(state = initialState, action) {
    switch (action.type){
        case UPDATE_ROUTE_NAME:
            return{
                ...state,
                routeName: action.routeName
            };
        default:
            return state;
    }
}
