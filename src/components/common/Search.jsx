import { useContext, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless'; // different import path!

import { SearchItem } from '../common';
import { SearchContext } from '../../context/searchContext';
import '../../styles/SearchItem.scss';
import useDebounce from '../../hooks/useDebounce';

function Search() {
    const { dispatch: searchDispatch, getSearchProducts, searchResult } = useContext(SearchContext);
    const [searchValue, setSearchTerm] = useState('');
    const [showResult, setShowResult] = useState(false);
    const handleSearchTerm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };

    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        if (!debouncedSearch) {
            return;
        }
        getSearchProducts(searchDispatch, debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);
    const handleShowResult = () => {
        setShowResult(false);
    };

    return (
        <form className="navbar-search-form">
            <div className="input-group bg-white">
                <Tippy
                    placement="bottom-start"
                    interactive
                    onClickOutside={handleShowResult}
                    visible={debouncedSearch.length > 0 && showResult}
                    content="Tìm kiếm"
                    render={(attrs) => (
                        <div className="bg-white search-result">
                            {searchResult.map((item) => (
                                <SearchItem {...attrs} data={item} key={item.id} />
                            ))}
                        </div>
                    )}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={handleSearchTerm}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                </Tippy>
                <Link to={`search/${searchValue}`} className="btn btn-primary flex align-center text-white px-3">
                    <BsSearch size={15} />
                    <span className="fs-15 mx-2">Search</span>
                </Link>
            </div>
        </form>
    );
}

export default Search;
