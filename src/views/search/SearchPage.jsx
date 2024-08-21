import { SearchContext } from '../../context/searchContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Title, Preloader, ProductList } from '../../components/common/';
import { FaHourglassEnd } from 'react-icons/fa';

const SearchPage = () => {
    const { searchValue } = useParams();

    const {
        dispatch: searchDispatch,
        searchResult,
        searchResultLoading,
        getSearchProducts,
    } = useContext(SearchContext);

    useEffect(() => {
        getSearchProducts(searchDispatch, searchValue);
        // eslint-disable-next-line
    }, [searchValue]);

    if (searchResult.length === 0) {
        return (
            <main className="bg-secondary">
                <div className="container">
                    <div className="sc-wrapper py-5">
                        <p className="flex align-center justify-center text-primary text-center fw-7 fs-20">
                            <FaHourglassEnd />
                            <span>Not Found!</span>
                        </p>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper py-5">
                    <Title title={'Your Search'} />
                    <br />
                    <br />
                    {searchResultLoading ? <Preloader /> : <ProductList products={searchResult} />}
                </div>
            </div>
        </main>
    );
};

export default SearchPage;
