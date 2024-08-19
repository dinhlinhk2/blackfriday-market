import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import rootReducer from '../reducers/';
import { constants } from '../constans';
import { setGridView, setListView, loadProducts, priceSort } from '../actions/filterActions';

const initialState = {
    products: [],
    filtered_products: [],
    grid_view: true,
    sort_by: constants.BEST_MATCH,
};

export const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.filter, initialState);
    return (
        <FilterContext.Provider value={{ ...state, dispatch, setGridView, setListView, priceSort, loadProducts }}>
            {children}
        </FilterContext.Provider>
    );
};
FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
