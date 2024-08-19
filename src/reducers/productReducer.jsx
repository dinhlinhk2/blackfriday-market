import { actionType } from '../constans';

const productReducer = (state, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                productsLoading: true,
                productsError: false,
            };
        case actionType.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsLoading: false,
                productsError: false,
                products: action.payload,
            };
        case actionType.GET_PRODUCTS_FAIL:
            return {
                ...state,
                productsLoading: false,
                productsError: true,
                productsErrorMsg: action.payload,
            };

        default:
            return state;
    }
};

export default productReducer;
