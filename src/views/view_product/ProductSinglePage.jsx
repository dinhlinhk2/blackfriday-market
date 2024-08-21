import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import images from '../../utils/images';
import '../../styles/ProductSinglePage.scss';
import { ProductContext } from '../../context/productContext';
import { BasketContext } from '../../context/basketContext';
import { AiFillCheckCircle, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { formatPrice, calculateDiscountedPrice } from '../../utils/helpers';
import { MdCancel } from 'react-icons/md';

const ProductSinglePage = () => {
    const { id } = useParams();
    const { getSingleProduct, singleProduct, dispatch: productDispatch } = useContext(ProductContext);

    const {
        addToBasket,
        setBasketMsgOn,
        setBasketMsgOff,
        dispatch: basketDispatch,
        basketMsgStatus,
    } = useContext(BasketContext);

    console.log(basketMsgStatus);

    useEffect(() => {
        setBasketMsgOff(basketDispatch);
        getSingleProduct(productDispatch, id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const [previewImg, setPreviewImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const handleIncreaseQuantity = () => {
        setQuantity((quantity) => {
            let temp = quantity + 1;
            if (temp > singleProduct.quantity) {
                temp = singleProduct.stock;
            }
            return temp;
        });
    };
    const handleDescreaseQuantity = () => {
        setQuantity((quantity) => {
            let temp = quantity - 1;
            if (temp < 1) {
                temp = 1;
            }
            return temp;
        });
    };

    const handleBasket = (product) => {
        let discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
        let totalPrice = quantity * discountedPrice;
        addToBasket(basketDispatch, { ...product, quantity, discountedPrice, totalPrice, checkoutStatus: false });
        setBasketMsgOn(basketDispatch);
        console.log(product);
    };

    return (
        <main className="bg-secondary">
            {/* alert basket */}
            <div className={`basket-alert ${basketMsgStatus ? 'show' : ''}`}>
                <div className="alert-content">
                    <div className="alert-msg grid px-4">
                        <AiFillCheckCircle size={20} className="text-line" />
                        <p className="fs-13">Add succes. You have 1 item in your shopping cart</p>
                    </div>
                    <div className="basket-alert-btns px-4 py-4">
                        <button
                            type="button"
                            className="alert-close-btn"
                            onClick={() => setBasketMsgOff(basketDispatch)}
                        >
                            <MdCancel size={20} className="text-dark" />
                        </button>
                        <Link to="/basket" className="fs-13 alert-btn text-white bg-primary">
                            View Cart
                        </Link>
                        <Link to="/" className="fs-13 alert-btn text-primary">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="sc-wrapper py-5">
                    <div className="product-s bg-white grid">
                        {/* image singleProduct */}
                        <div className="product-s-img">
                            <div className="img-preview py-5">
                                <div className="img-preview-zoom">
                                    <img
                                        src={singleProduct?.images ? singleProduct.images[previewImg] : images.no_image}
                                        alt={singleProduct?.title}
                                        className="img-cover"
                                    />
                                </div>
                                <div className="img-preview-collection flex justify-center">
                                    {singleProduct?.images?.map((image, index) => {
                                        return (
                                            <div
                                                className={`collection-item ${
                                                    previewImg === index ? 'collection-item-active' : ''
                                                }`}
                                                key={index}
                                                onClick={() => setPreviewImg(index)}
                                            >
                                                <img
                                                    src={image ? image : images.no_image}
                                                    alt={singleProduct?.title}
                                                    className="img-cover"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* detail product */}

                        <div className="product-s-details py-5">
                            <div className="title fw-6 fs-16 px-3 py-1">{singleProduct.title}</div>
                            <p className="description fs-14">{singleProduct.description}</p>
                            <div className="rating my-2 flex align-center">
                                <AiOutlineStar size={16} className="text-yellow" />
                                <span className="mx-1 fs-13">{singleProduct.rating}</span>
                            </div>
                            <div className="price flex align-center">
                                <span className="discounted-price fs-20 fw-7">
                                    {singleProduct?.price && singleProduct?.discountPercentage
                                        ? formatPrice(
                                              calculateDiscountedPrice(
                                                  singleProduct.price,
                                                  singleProduct.discountPercentage,
                                              ),
                                          )
                                        : 0}
                                </span>
                                <span className="actual-price text-dark mx-3">{formatPrice(singleProduct?.price)}</span>
                                <span className="discounted-percent text-primary fs-12">
                                    {singleProduct?.discountPercentage}%
                                </span>
                            </div>

                            {/* quantity */}

                            <div className="quantity py-3">
                                <h5 className="fw-4">Quantity:</h5>
                                <div className="quantity-toggle flex">
                                    <button
                                        className="qty-dec flex align-center justify-center"
                                        onClick={handleDescreaseQuantity}
                                    >
                                        <AiOutlineMinus size={14} />
                                    </button>
                                    <div className="qty-value flex align-center justify-center fs-14 mx-2">
                                        {quantity}
                                    </div>
                                    <button
                                        className="qty-inc flex align-center justify-center"
                                        onClick={handleIncreaseQuantity}
                                    >
                                        <AiOutlinePlus size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Brand product */}

                            <div className="info py-1 flex flex-wrap align-center">
                                <div className="fs-13">
                                    <span className="fw-6">Brand:</span>
                                    <span className="px-1">{singleProduct?.brand}</span>
                                </div>
                                <div className="fs-13 mx-3">
                                    <span className="fw-6">Category:</span>
                                    <span className="px-1">{singleProduct?.category}</span>
                                </div>
                            </div>

                            <div className="shop-btns">
                                <Link to="/login" className="buy-btn shop-btn fs-14">
                                    Buy Now
                                </Link>
                                <button
                                    className="add-to-cart-btn shop-btn fs-14"
                                    onClick={() => handleBasket(singleProduct)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductSinglePage;
