import { GET_ALL_PRODUTOS, UPDATE_PRODUTO } from '../reducers/products';
import type { GetState, Dispatch } from '../reducers/types';
import models from '../../models/index';
import {
  message
} from 'antd';


export function getAllProducts(){
    const produtos = models.Products.findAll()
    return {
        type: GET_ALL_PRODUTOS,
        payload: produtos
    };
}

export function updateProduct(instance, data){

    return dispatch => {

        instance.update({...data}).then(()=>{
                dispatch(getAllProducts())
                return {
                    type: UPDATE_PRODUTO,
                }
            }
        )
        message.success('produto salvo' , 1.5)

    }
}
