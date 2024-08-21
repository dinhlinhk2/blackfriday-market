import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import rootReducer from '../reducers/';
import { getSearchProducts } from '../actions/searchActions';

const initialState = {
    authData: '',
    makeAuthRequest: [],
    authErrorMsg: false,
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.auth, initialState);

    return <AuthContext.Provider value={{ ...state, dispatch, getSearchProducts }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
