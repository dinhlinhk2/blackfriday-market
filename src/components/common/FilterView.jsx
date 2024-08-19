import { useContext, useEffect } from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

import { ProductContext } from '../../context/productContext';
import '../../styles/FilterView.scss';
import { constants } from '../../constans';
import { FilterContext } from '../../context/filterContext';

const FilterView = () => {
    const { products } = useContext(ProductContext);
    const {
        setListView,
        setGridView,
        loadProducts,
        priceSort,
        sort_by,
        dispatch: filterDispatch,
    } = useContext(FilterContext);

    useEffect(() => {
        if (products.length > 0) {
            loadProducts(filterDispatch, products);
            priceSort(filterDispatch, sort_by);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    return (
        <div className="filter-top">
            <div className="container">
                <div className="filter-top-content py-3 flex align-center justify-between bg-white px-3">
                    <div className="filter-top-sort flex align-center">
                        <p className="fs-13 text-dark">Sort By:</p>
                        <select
                            className="fs-13 mx-2 filter-select"
                            onChange={(e) => {
                                priceSort(filterDispatch, e.target.value);
                            }}
                        >
                            <option defaultValue={constants.BEST_MATCH} value={constants.BEST_MATCH}>
                                Best Match
                            </option>
                            <option value={constants.LOW_TO_HIGH}>Price (Low to High)</option>
                            <option value={constants.HIGH_TO_LOW}>Price (High to Low)</option>
                        </select>
                    </div>

                    <div className="filter-top-view flex align-center">
                        <p>View:</p>
                        <button type="button" className="grid-btn" onClick={() => setGridView(filterDispatch)}>
                            <BsFillGridFill />
                        </button>
                        <button type="button" className="list-btn" onClick={() => setListView(filterDispatch)}>
                            <FaThList />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterView;
