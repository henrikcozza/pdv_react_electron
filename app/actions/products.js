import { GET_ALL_PRODUTOS } from '../reducers/products';
import type { GetState, Dispatch } from '../reducers/types';
import models from '../../models/index';


export function handlerProdutos(value){
    const produtos = models.Products.findAll()
    return {
        type: GET_ALL_PRODUTOS,
        payload: produtos
    };
}
