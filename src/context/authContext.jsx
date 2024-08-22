import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import rootReducer from '../reducers/';
import { makeAuthRequest, logout } from '../actions/authActions';
import { getFromLocalStorage } from '../utils/helpers';

const fetchData = () => {
    let authData = getFromLocalStorage('authData');
    if (authData.length === 0) {
        return (authData = {
            isLoggedIn: false,
            info: {},
        });
    }
    return authData;
};

const initialState = {
    authData: fetchData(),
    authLoading: false,
    authError: false,
    authErrorMsg: '',
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.auth, initialState);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, makeAuthRequest, logout }}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
