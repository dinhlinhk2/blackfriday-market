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
            const tempBasket = state.basket.map((item) => {
                if (item.id === action.payload) {
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
            storeInLocalStorage(tempBasket, 'basket');
            const unChecked = tempBasket.filter((item) => item.checkoutStatus === true);
            storeInLocalStorage(unChecked, 'checkout');
            return {
                ...state,
                basket: tempBasket,
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
            const unChecked = tempBasket.filter((item) => item.checkoutStatus === true);
            storeInLocalStorage(unChecked, 'checkout');
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
            storeInLocalStorage(tempBasket, 'basket');
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

        case actionType.ADD_CHECKOUT_ITEM: {
            const tempBasket = state.basket.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        checkoutStatus: true,
                    };
                }
                return item;
            });
            const unChecked = tempBasket.filter((item) => item.checkoutStatus === true);

            storeInLocalStorage(tempBasket, 'basket');
            storeInLocalStorage(unChecked, 'checkout');
            return {
                ...state,
                basket: tempBasket,
                checkoutAll: unChecked === 0 ? true : false,
            };
        }
        case actionType.REMOVE_CHECKOUT_ITEM: {
            const tempBasket = state.basket.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        checkoutStatus: false,
                    };
                }
                return item;
            });
            const unChecked = tempBasket.filter((item) => item.checkoutStatus === true);
            storeInLocalStorage(tempBasket, 'basket');
            storeInLocalStorage(unChecked, 'checkout');
            return {
                ...state,
                basket: tempBasket,
                checkoutAll: false,
            };
        }
        case actionType.GET_CHECKOUT_TOTAL: {
            let tempTotal = state.basket
                .reduce((checkoutTotal, basketItem) => {
                    return (checkoutTotal += basketItem.checkoutStatus ? Number(basketItem.totalPrice) : 0);
                }, 0)
                .toFixed(2);

            let tempCount = state.basket.filter((basketItem) => basketItem.checkoutStatus === true).length;

            return {
                ...state,
                checkoutTotal: tempTotal,
                checkoutCount: tempCount,
                checkoutAll: tempCount === state.basket.length ? true : false,
            };
        }

        case actionType.SET_CHECKOUT_ALL: {
            const setAllBasket = state.basket.map((item) => {
                return { ...item, checkoutStatus: true };
            });

            const unChecked = setAllBasket.filter((item) => item.checkoutStatus === true);
            storeInLocalStorage(setAllBasket, 'basket');
            storeInLocalStorage(unChecked, 'checkout');
            return { ...state, checkoutAll: true, basket: setAllBasket };
        }

        case actionType.UNSET_CHECKOUT_ALL: {
            const tempBasket = state.basket.map((item) => {
                return { ...item, checkoutStatus: false };
            });

            const unChecked = tempBasket.filter((item) => item.checkoutStatus === true);
            storeInLocalStorage(tempBasket, 'basket');
            storeInLocalStorage(unChecked, 'checkout');
            return { ...state, checkoutAll: false, basket: tempBasket };
        }

        case actionType.CHECK_CHECKOUT_ALL: {
            let tempStatus = state.basket.filter((item) => item.checkoutStatus === false).length === 0 ? true : false;
            return { ...state, checkoutAll: tempStatus };
        }

        default:
            return state;
    }
};

export default basketReducer;
