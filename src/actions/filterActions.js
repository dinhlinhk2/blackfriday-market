import { actionType } from '../constans';

export const setGridView = (dispatch) => dispatch({ type: actionType.SET_GRIDVIEW });

export const setListView = (dispatch) => dispatch({ type: actionType.SET_LISTVIEW });

export const loadProducts = (dispatch, products) => dispatch({ type: actionType.LOAD_PRODUCTS, payload: products });

export const priceSort = (dispatch, sortType) => dispatch({ type: actionType.PRICE_SORT, payload: sortType });
