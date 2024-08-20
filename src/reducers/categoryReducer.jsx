import { actionType } from '../constans';

const categoryReducer = (state, action) => {
    switch (action.type) {
        case actionType.CATEGORY_LIST_REQUEST:
            return {
                ...state,
                categoriesLoading: true,
                categoriesError: false,
            };
        case actionType.CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                categoriesLoading: false,
                categoriesError: false,
                categories: action.payload,
            };
        case actionType.CATEGORY_LIST_FAIL:
            return {
                ...state,
                categoriesLoading: false,
                categoriesError: true,
                categoriesErrorMsg: action.payload,
            };
        case actionType.CATEGORY_PRODUCT_REQUEST:
            return {
                ...state,
                categoryProductLoading: true,
                categoryProductError: false,
            };
        case actionType.CATEGORY_PRODUCT_SUCCESS:
            return {
                ...state,
                categoryProductLoading: false,
                categoryProductError: false,
                categoryProducts: action.payload,
            };
        case actionType.CATEGORY_PRODUCT_FAIL:
            return {
                ...state,
                categoryProductLoading: false,
                categoryProductError: true,
                categoryProducts: action.payload,
            };

        default:
            return state;
    }
};

export default categoryReducer;
