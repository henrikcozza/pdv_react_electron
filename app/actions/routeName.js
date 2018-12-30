import { UPDATE_ROUTE_NAME } from '../reducers/routeName';
import type { GetState, Dispatch } from '../reducers/types';

export function handlerRouteName(value){
    return (dispatch: Dispatch, getState:GetState) => {
        const { routeName } = getState();

        dispatch(setRouteName(value))
    };
}

export function setRouteName(value) {
  return {
      type: UPDATE_ROUTE_NAME,
      routeName: value
  };
}
