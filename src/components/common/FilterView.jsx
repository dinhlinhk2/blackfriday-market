// import { useContext } from 'react';
// import { ProductContext } from '../../context/productContext';
import '../../styles/FilterView.scss';
import * as contains from '../../constans/constants';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

const FilterView = () => {
    // const { products } = useContext(ProductContext);

    return (
        <div className="filter-top">
            <div className="container">
                <div className="filter-top-content py-3 flex align-center justify-between bg-white px-3">
                    <div className="filter-top-sort flex align-center">
                        <p className="fs-13 text-dark">Sort By:</p>
                        <select className="fs-13 mx-2 filter-select">
                            <option defaultValue={contains.BEST_MATCH} value={contains.BEST_MATCH}>
                                Best Match
                            </option>
                            <option value={contains.LOW_TO_HIGH}>Price (Low to High)</option>
                            <option value={contains.HIGH_TO_LOW}>Price (High to Low)</option>
                        </select>
                    </div>

                    <div className="filter-top-view flex align-center">
                        <p>View:</p>
                        <button type="button" className="grid-btn">
                            <BsFillGridFill />
                        </button>
                        <button type="button" className="list-btn">
                            <FaThList />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterView;
