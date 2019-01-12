// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import routeName from './routeName';
import produtos from './products';
import venda from './sell';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    routeName,
    produtos,
    venda
  });
}
