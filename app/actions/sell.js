
import {
    CANCELA_VENDA,
    REMOVE_PRODUTO,
    SET_PRODUTO} from '../reducers/sell';

import type { GetState, Dispatch } from '../reducers/types';
import models from '../../models/index';
import {
  message
} from 'antd';



export function setProduct(data){
    return {
        type: SET_PRODUTO,
        payload: data
    }
}

export function removeProduct(data){
    return {
        type: REMOVE_PRODUTO,
        payload: data
    }
}

export function cancelSell(){
    return {
        type: CANCELA_VENDA,
    }
}
