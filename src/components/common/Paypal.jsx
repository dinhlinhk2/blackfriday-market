import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

import { getFromLocalStorage, storeInLocalStorage } from '../../utils/helpers';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
// eslint-disable-next-line react/prop-types
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    const handleSaveOrder = () => {
        const item = { ...payload, success: true };
        storeInLocalStorage(item, 'order');
        const data = getFromLocalStorage('order');
        if (data.success) {
            storeInLocalStorage([], 'basket');
            window.location.assign('/checkoutsuccess');
        }
    };
    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderID) => orderID)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (response) => {
                        if (response.status === 'COMPLETED') {
                            handleSaveOrder();
                        }
                    })
                }
            />
        </>
    );
};

// eslint-disable-next-line react/prop-types
export default function Paypal({ amount, payload }) {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}
