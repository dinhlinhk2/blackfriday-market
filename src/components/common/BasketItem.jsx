import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import { formatPrice } from '../../utils/helpers';
import '../../styles/BasketPage.scss';
import { BasketContext } from '../../context/basketContext';

const BasketItem = ({ item }) => {
    const {
        dispatch: basketDispatch,
        addQtyItem,
        minusQtyItem,
        removeFromBasket,
        addToCheckout,
        removeFromCheckout,
    } = useContext(BasketContext);

    function handleCheckout(e) {
        if (e.target.checked) {
            addToCheckout(basketDispatch, item?.id);
        } else {
            removeFromCheckout(basketDispatch, item?.id);
        }
    }

    return (
        <div className="basket-list-item grid px-3 py-3" key={item.id}>
            <div className="checkbox-item py-3">
                <div className="checkbox-icon">
                    <input
                        type="checkbox"
                        className="form-control"
                        onChange={handleCheckout}
                        checked={item.checkoutStatus}
                    />
                </div>
            </div>

            <div className="basket-list-item-info grid">
                <div className="item-info-img">
                    <img src={item?.thumbnail} alt={item?.title} className="img-cover" />
                </div>
                <div className="item-info-details py-2">
                    <div className="item-info-details-top">
                        <h4>{item.title}</h4>
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeFromBasket(basketDispatch, item.id)}
                        >
                            <BsTrash />
                        </button>
                    </div>

                    <div className="flex align-center flex-wrap py-1">
                        <span className="fs-13 text-dark">Brand: {item?.brand}</span>
                        <span className="mx-3 fs-13 text-dark">Category: {item?.category}</span>
                    </div>

                    <div className="flex align-center justify-between">
                        <span className="fw-7 fs-17 text-yellow">${item.price}</span>
                        <div className="quantity">
                            <div className="quantity-toggle flex">
                                <button
                                    className={`qty-dec flex align-center justify-center ${
                                        item.quantity === 1 ? 'show' : ''
                                    }`}
                                    onClick={() => minusQtyItem(basketDispatch, item.id)}
                                >
                                    <AiOutlineMinus size={14} />
                                </button>
                                <div className="fs-14 mx-2 qty-value flex align-center justify-center">
                                    {item.quantity}
                                </div>
                                <button
                                    className={`qty-dec flex align-center justify-center ${
                                        item.quantity === item.stock ? 'show' : ''
                                    }`}
                                    onClick={() => addQtyItem(basketDispatch, item.id)}
                                >
                                    <AiOutlinePlus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="fs-14">
                        <span className="fw-6">Total: {formatPrice(item.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BasketItem.propTypes = {
    item: PropTypes.object,
};

export default BasketItem;
