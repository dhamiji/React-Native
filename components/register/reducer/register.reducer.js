import { registerConstants } from '../constant';
import { combineReducers } from 'redux';
import createReducer from '../../../helpers/createReducer';

const initialState = {};

const registerReducer = createReducer(initialState)({
    [registerConstants.REGISTER_SUCCESS]: (state, action) => action.payload,
    [registerConstants.REGISTER_FAILURE]: (state, action) => action.payload,
  })

  export default combineReducers({
    register: registerReducer,
  })