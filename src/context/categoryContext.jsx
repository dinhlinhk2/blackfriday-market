import { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategoriesList, getCategoryProducts } from '../actions/categoryActions';

import rootReducer from '../reducers/';

const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesError: false,
    categoriesErrorMsg: '',
    categoryProductLoading: false,
    categoryProductError: false,
    categoryProducts: [],
};

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.category, initialState);

    useEffect(() => {
        getCategoriesList(dispatch);
    }, [dispatch]);

    return (
        <CategoryContext.Provider value={{ ...state, dispatch, getCategoriesList }}>
            {children}
        </CategoryContext.Provider>
    );
};

CategoryProvider.propTypes = {
    children: PropTypes.node,
};
