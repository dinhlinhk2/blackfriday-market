import axios from '../api/axios';
import { actionType } from '../constans';

export const makeAuthRequest = async (dispatch, loginData) => {
    dispatch({
        type: actionType.AUTH_REQUEST,
    });
    try {
        const { data } = await axios.post('user/login', JSON.stringify(loginData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({
            type: actionType.AUTH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        if (!error.resonse) {
            dispatch({
                type: actionType.AUTH_FAIL,
                payload: 'No server response',
            });
        }
        if (error.response.status === 400) {
            dispatch({
                type: actionType.AUTH_FAIL,
                payload: 'Invalid credentials',
            });
        }
        if (error.response.status === 401) {
            dispatch({
                type: actionType.AUTH_FAIL,
                payload: 'UnAuthorized',
            });
        }
    }
};

export const logout = (dispatch) => {
    dispatch({
        type: actionType.LOGOUT,
    });
};
