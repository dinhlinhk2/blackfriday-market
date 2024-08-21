import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import '../../styles/ProductList.scss';
import { AiOutlineStar } from 'react-icons/ai';
import { FilterContext } from '../../context/filterContext';

function ProductList({ products }) {
    const { grid_view } = useContext(FilterContext);

    return (
        <div className="products">
            <div className="container">
                <div className={`product-list ${grid_view ? 'gridview' : 'listview'}`}>
                    {products?.map((product) => {
                        return (
                            <Link to={`/products/${product.id}`} key={product.id} className="product-item">
                                <div className="product-item-img">
                                    <img src={product.thumbnail} className="img-cover" />
                                    <div className="product-discount">
                                        {product.discountPercentage}
                                        <span>%</span>
                                    </div>
                                </div>
                                <div className="product-item-body">
                                    <span className="product-category">{product.category}</span>
                                    <span className="product-title">{product.title}</span>

                                    <div className="product-price">
                                        <span className="fw-6 fs-16">$ {product.price}</span>
                                        <span className="text-dark">Brand: {product.brand}</span>
                                    </div>

                                    <div className="product-item-bottom fs-12 flex align-center">
                                        <div>
                                            <span className="fw-6">Stock : </span>
                                            {product.stock}
                                        </div>
                                        <div className="product-rating flex align-center">
                                            <AiOutlineStar /> {product.rating}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array,
};

export default ProductList;
