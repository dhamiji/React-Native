import { loginConstants } from '../constant';
import { loginService } from '../service';

export const fetchLoginSuccess = response => ({
    type: loginConstants.LOGIN_SUCCESS,
    payload: response
})

export const fetchLoginFailure = response => ({
    type: loginConstants.LOGIN_FAILURE,
    payload: response
})

export const login = (param) => {
    return (dispatch, state) => {
        return loginService.login(param)
            .then(response => {
                dispatch(fetchLoginSuccess(response));
                return response;
            },
                error => {
                    dispatch(fetchLoginFailure(error));
                    return error;
                })
    }
}
