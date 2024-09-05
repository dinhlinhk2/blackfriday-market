import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

function CheckoutSummary({ checkoutCount, checkoutTotal }) {
    return (
        <div className="summary bg-white py-2 px-4">
            <h2>Summary</h2>
            <div className="flex align-center justify-between my-2">
                <p>Total</p>
                <p className="fw-6 fs-24">
                    <span className="fw-7 text-yellow">US </span>
                    {formatPrice(checkoutTotal)}
                </p>
            </div>
            {checkoutCount > 0 && (
                <Link to={'/checkout'}>
                    <button className="checkout-btn fw-6">Checkout ({checkoutCount})</button>
                </Link>
            )}
        </div>
    );
}

CheckoutSummary.propTypes = {
    checkoutCount: PropTypes.number,
    checkoutTotal: PropTypes.number,
};

export default CheckoutSummary;
