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
                type: actionType.AUTH_ERROR,
                payload: 'No server response',
            });
        }
        if (error.response.status === 400) {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: 'Invalid credentials',
            });
        }
        if (error.response.status === 401) {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: 'UnAuthorized',
            });
        }
    }
};

export const loginGoogle = async (dispatch, res) => {
    dispatch({
        type: actionType.LOGIN_GOOGLE_REQUEST,
    });
    try {
        const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${res.access_token}`,
            },
        });
        console.log(data);

        dispatch({
            type: actionType.LOGIN_GOOGLE_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        if (!error.resonse) {
            dispatch({
                type: actionType.LOGIN_GOOGLE_ERROR,
                payload: 'No server response',
            });
        }
        if (error.response.status === 400) {
            dispatch({
                type: actionType.LOGIN_GOOGLE_ERROR,
                payload: 'Invalid credentials',
            });
        }
        if (error.response.status === 401) {
            dispatch({
                type: actionType.LOGIN_GOOGLE_ERROR,
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
