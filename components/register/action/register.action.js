import { registerConstants } from '../constant';
import { registerService } from '../service';

export const fetchRegisterSuccess = response => ({
    type: registerConstants.REGISTER_SUCCESS,
    payload: response
})

export const fetchRegisterFailure = response => ({
    type: registerConstants.REGISTER_FAILURE,
    payload: response
})

export const register = (param) => {
    return (dispatch, state) => {
        return registerService.register(param)
            .then(response => {
                dispatch(fetchRegisterSuccess(response));
                return response;
            },
                error => {
                    dispatch(fetchRegisterFailure(error));
                    return error;
                })
    }
}
