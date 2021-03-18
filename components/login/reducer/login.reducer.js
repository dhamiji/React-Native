import { loginConstants } from '../constant';
import { combineReducers } from 'redux';
import createReducer from '../../../helpers/createReducer';

const initialState = {};

const loginReducer = createReducer(initialState)({
    [loginConstants.LOGIN_SUCCESS]: (state, action) => action.payload,
    [loginConstants.LOGIN_FAILURE]: (state, action) => action.payload,
  })

  export default combineReducers({
    loginToken: loginReducer,
  })