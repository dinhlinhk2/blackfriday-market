import { actionType, constants } from '../constans';

const filterReducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_GRIDVIEW:
            return {
                ...state,
                grid_view: true,
            };
        case actionType.SET_LISTVIEW:
            return {
                ...state,
                grid_view: false,
            };
        case actionType.LOAD_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case actionType.PRICE_SORT: {
            let temp = JSON.parse(JSON.stringify(state.products));
            switch (action.payload) {
                case constants.BEST_MATCH:
                    return {
                        ...state,
                        filtered_products: state.products,
                        sort_by: action.payload,
                    };
                case constants.LOW_TO_HIGH:
                    return {
                        ...state,
                        filtered_products: temp.sort((a, b) => a.price - b.price),
                        sort_by: action.payload,
                    };
                case constants.HIGH_TO_LOW:
                    return {
                        ...state,
                        filtered_products: temp.sort((a, b) => b.price - a.price),
                        sort_by: action.payload,
                    };
                default:
                    return state;
            }
        }
        default:
            return state;
    }
};

export default filterReducer;
