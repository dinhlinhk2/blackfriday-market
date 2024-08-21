import { actionType } from '../constans';

const searchReducer = (state, action) => {
    switch (action.type) {
        case actionType.GET_SEARCH_RESULT_REQUEST:
            return {
                ...state,
                searchResultLoading: true,
                searchResultError: false,
            };
        case actionType.GET_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchResultLoading: false,
                searchResultError: false,
                searchResult: action.payload,
            };
        case actionType.GET_SEARCH_RESULT_FAIL:
            return {
                ...state,
                searchResultLoading: false,
                searchResultError: true,
                searchResultErrorMsg: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
