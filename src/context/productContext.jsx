import { useEffect, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import rootReducer from '../reducers/';
import { getAllProducts } from '../actions/productActions';

const initialState = {
    products: [],
    productsLoading: false,
    productsError: false,
    productsErrorMsg: '',
    singleProduct: [],
    singleProductLoading: false,
    singleProductError: false,
    singleProductErrorMsg: '',
    categories: [],
    categoriesLoading: false,
};

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.product, initialState);

    useEffect(() => {
        getAllProducts(dispatch);
    }, []);
    return <ProductContext.Provider value={{ ...state, dispatch }}>{children}</ProductContext.Provider>;
};

ProductProvider.propTypes = {
    children: PropTypes.node,
};
