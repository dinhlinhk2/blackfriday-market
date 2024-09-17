import { useContext, useEffect } from 'react';

import { BasketContext } from '../../context/basketContext';
import '../../styles/BasketPage.scss';
import { PaymentMethods, CheckoutSummary, BasketItem } from '../../components/common';
import { FaHourglassEnd } from 'react-icons/fa';

function BasketPage() {
    const {
        basket,
        clearBasket,
        dispatch: basketDispatch,
        getCheckoutTotal,
        checkoutTotal,
        checkoutCount,
        setCheckoutAll,
        unsetCheckoutAll,
        checkoutAll,
    } = useContext(BasketContext);

    useEffect(() => {
        getCheckoutTotal(basketDispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basket]);

    console.log(checkoutCount, checkoutTotal);
    console.log(checkoutAll);

    function handleCheckAll(e) {
        if (e.target.checked) {
            setCheckoutAll(basketDispatch);
        } else {
            unsetCheckoutAll(basketDispatch);
        }
    }
    if (basket.length === 0) {
        return (
            <main className="bg-secondary">
                <div className="container">
                    <div className="sc-wrapper py-4 flex align-center justify-center">
                        <FaHourglassEnd />
                        <h1>Your basket is empty.</h1>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper">
                    <div className="basket grid">
                        {/* basket left */}
                        <div className="basket-l py-4">
                            <div className="basket-top bg-white px-3 py-4">
                                <h2>
                                    Shopping Cart <span className="text-primary">({checkoutCount})</span>
                                </h2>
                                <div className="flex align-center justify-between">
                                    <div className="checkbox-item flex py-3">
                                        <div className="checkbox-icon flex align-center">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                id="checkall"
                                                onChange={handleCheckAll}
                                                checked={checkoutAll}
                                            />
                                        </div>
                                        <p className="form-text">Sellect all item</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="fs-16 fw-7 text-primary"
                                        onClick={() => clearBasket(basketDispatch)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="basket-list bg-white my-3">
                                {basket.map((basketItem) => {
                                    return <BasketItem item={basketItem} key={basketItem.id} />;
                                })}
                            </div>
                        </div>
                        {/* basket right */}
                        <div className="basket-r py-4">
                            <CheckoutSummary
                                checkoutCount={Number(checkoutCount)}
                                checkoutTotal={Number(checkoutTotal)}
                            />
                            <PaymentMethods />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BasketPage;
