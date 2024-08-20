export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

export const calculateDiscountedPrice = (price, discountPrice) => {
    return price - (discountPrice / 100) * price;
};

export const storeInLocalStorage = (value, key) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
    let basket = localStorage.getItem(key);
    if (basket) {
        return JSON.parse(basket);
    } else {
        return [];
    }
};
