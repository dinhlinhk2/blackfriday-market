import { AuthContext } from '../../context/authContext';
import '../../styles/AccountPage.scss';
import { useContext } from 'react';
import { formatPrice, getFromLocalStorage } from '../../utils/helpers';
function AccountPage() {
    const { authData } = useContext(AuthContext);
    const order = getFromLocalStorage('order');
    // console.log(order.products);

    // order.products.map((product) => {
    //     console.log(product);
    // });

    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper">
                    <div className="account-details bg-white grid">
                        <div className="account-details-left">
                            <div className="info-elem">
                                <span className="info-elem-label">Full Name:</span>
                                <span className="info-elem-value">{`${
                                    authData.info?.firstName || authData.info?.family_name
                                } ${authData.info?.lastName || authData.info?.given_name}`}</span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Username</span>
                                <span className="info-elem-value">
                                    {authData.info?.username || authData.info?.name}
                                </span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Email</span>
                                <span className="info-elem-value">{authData.info?.email}</span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Gender</span>
                                <span className="info-elem-value">
                                    {authData.info?.gender?.charAt(0).toUpperCase()}
                                    {authData.info?.gender?.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="account-details-right">
                            <img src={authData.info?.image || authData.info?.picture} alt="user_image" />
                        </div>
                    </div>
                    {order.products.length > 0 &&
                        order.products.map((product) => {
                            return (
                                <div className="px-3 py-3" key={product?.id}>
                                    <div className="account-details grid mt-0">
                                        <div className="account-details-right">
                                            <img src={product?.thumbnail} alt={product?.title} className="img-cover" />
                                        </div>
                                        <div className="account-details-left">
                                            <div className="item-info-details-top">
                                                <h4>{product?.title}</h4>
                                            </div>

                                            <div className="flex align-center flex-wrap py-1">
                                                <span className="fs-13 text-dark">Brand: {product?.brand}</span>
                                                <span className="fs-13 text-dark">Category: {product?.category}</span>
                                            </div>

                                            <div className="flex align-center justify-between">
                                                <span className="fw-7 fs-17 text-yellow">${product?.price}</span>
                                            </div>

                                            <div className="fs-14">
                                                <span className="fw-6">Total: {formatPrice(product?.totalPrice)}</span>
                                            </div>
                                            <div className="fs-14">
                                                <span className="fw-6">
                                                    <span>Date: {order.success}</span>
                                                </span>
                                            </div>
                                            <div className="fs-14">
                                                <span className="fw-6">
                                                    <span>Date: {order.dateTime}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </main>
    );
}

export default AccountPage;
