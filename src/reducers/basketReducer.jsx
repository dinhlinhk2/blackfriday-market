import { actionType } from '../constans';
import { storeInLocalStorage } from '../utils/helpers';

const basketReducer = (state, action) => {
    switch (action.type) {
        case actionType.ADD_TO_BASKET: {
            const existItem = state.basket.find((item) => item.id === action.payload.id);
            if (existItem) {
                let temp = state.basket.map((item) => {
                    if (item.id === action.payload.id) {
                        item.quantity += action.payload.quantity;
                        item.total = (item.quantity * item.price).toFixed(2);
                    }
                    return item;
                });
                storeInLocalStorage(temp, 'basket');
                return {
                    ...state,
                    basket: temp,
                };
            } else {
                let tempBasket = [...state.basket, action.payload];
                storeInLocalStorage(tempBasket, 'basket');
                return {
                    ...state,
                    basket: tempBasket,
                };
            }
        }
        case actionType.ADD_QTY_ITEM: {
            const existItem = state.basket.map((item) => {
                if (item.id === action.payload.id) {
                    let temp = item.quantity + 1;
                    if (temp > item.stock) {
                        temp = item.stock;
                    }
                    let tempTotal = (temp * item.discountedPrice).toFixed(2);
                    return { ...item, quantity: temp, totalPrice: tempTotal };
                } else {
                    return item;
                }
            });
            storeInLocalStorage(existItem, 'basket');
            return {
                ...state,
                basket: existItem,
            };
        }
        case actionType.MINUS_QTY_ITEM: {
            const tempBasket = state.basket.map((item) => {
                if (item.id === action.payload) {
                    let tempQty = item.quantity - 1;
                    if (tempQty < 1) tempQty = 1;
                    let tempTotalPrice = (tempQty * item.discountedPrice).toFixed(2);
                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });
            storeInLocalStorage(tempBasket, 'basket');
            return { ...state, basket: tempBasket };
        }
        case actionType.CLEAR_BASKET: {
            storeInLocalStorage([], 'basket');
            return {
                ...state,
                basket: [],
            };
        }
        case actionType.REMOVE_FROM_BASKET: {
            const tempBasket = state.basket.filter((item) => item.id !== action.payload);
            storeInLocalStorage(state.basket, 'basket');
            return {
                ...state,
                basket: tempBasket,
            };
        }
        case actionType.SET_BASKET_MSG_ON:
            return { ...state, basketMsgStatus: action.payload };

        case actionType.SET_BASKET_MSG_OFF:
            return { ...state, basketMsgStatus: action.payload };

        case actionType.GET_BASKET_TOTAL: {
            let tempTotal = state.basket
                .reduce((basketTotal, basketItem) => {
                    return (basketTotal += Number(basketItem.totalPrice));
                }, 0)
                .toFixed(2);

            return { ...state, totalAmount: tempTotal, itemsCount: state.basket.length };
        }
        default:
            return state;
    }
};

export default basketReducer;
