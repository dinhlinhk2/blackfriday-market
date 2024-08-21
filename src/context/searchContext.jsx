import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import rootReducer from '../reducers/';
import { getSearchProducts } from '../actions/searchActions';

const initialState = {
    searchValue: '',
    searchResult: [],
    searchResultLoading: false,
    searchResultError: false,
    searchResultErrorMsg: '',
};

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.search, initialState);

    return (
        <SearchContext.Provider value={{ ...state, dispatch, getSearchProducts }}>{children}</SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node,
};
