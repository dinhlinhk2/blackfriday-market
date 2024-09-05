import images from '../../utils/images';
import '../../styles/NotFoundPage.scss';
import { Link } from 'react-router-dom';

import { Congrat } from '../../components/common';

function CheckoutSuccess() {
    return (
        <main>
            <Congrat />
            <div className="page-not-found bg-white py-5">
                <div className="container flex flex-column align-center justify-center text-center">
                    <img src={images.cart} alt="page not found" className="page-not-found-img" />
                    <div>
                        <h3>Buy Success.</h3>
                        <p className="fs-13 py-2 text-dark">Continue Shopping ~</p>
                        <Link to="/" className="btn-back-to-home">
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CheckoutSuccess;
