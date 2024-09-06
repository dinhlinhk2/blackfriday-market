import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BsCaretDownFill } from 'react-icons/bs';
import { HiShoppingBag } from 'react-icons/hi';
import { AiOutlineBars } from 'react-icons/ai';
import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CategoryContext } from '../../context/categoryContext';
import { BasketContext } from '../../context/basketContext';
import '../../styles/Navbar.scss';
import { AuthContext } from '../../context/authContext';
import Search from './Search';

const Navbar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const { categories } = useContext(CategoryContext);
    const { authData, logout, dispatch: authDispatch } = useContext(AuthContext);
    const { basket, getBasketTotal, itemsCount, totalAmount, dispatch: basketDispatch } = useContext(BasketContext);

    const handleShowCategories = () => {
        setShowCategories(!showCategories);
    };
    useEffect(() => {
        getBasketTotal(basketDispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basket]);

    const notify = () => {
        toast('Logout in successfully');
    };

    return (
        <nav className="navbar">
            <div className="navbar-top bg-secondary flex align-center">
                <div className="container w-100 flex align-center justify-end">
                    {authData.isLoggedIn ? (
                        <>
                            <Link to="/account" className="mx-4 flex align-center justify-end text-dark">
                                <FaUser size={14} />
                                <span className="mx-2 fs-13 text-uppercase ls-1">
                                    {authData.info.firstName || authData.info.name}
                                </span>
                            </Link>
                            <button
                                type="button"
                                className="flex align-center justify-end text-dark"
                                onClick={() => logout(authDispatch)}
                            >
                                <FiLogOut size={14} />
                                <span className="mx-2 fs-13 text-uppercase ls-1" onClick={notify}>
                                    Logout
                                </span>
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="mx-4 flex align-center login-btn justify-end text-dark">
                            <FaUser size={14} />
                            <span className="mx-2 fs-13 text-uppercase ls-1">Login</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="navbar-main bg-primary">
                <div className="container">
                    <div className="navbar-main-top flex align-center justify-between">
                        <Link to="/" className="navbar-brand">
                            <span className="text-yellow fs-26 fw-6">Black</span>
                            <span className="text-white fs-26 fw-6">Friday.</span>
                        </Link>

                        <Search />

                        <div className="navbar-basket text-white flex align-center">
                            <Link to="basket" className="basket-btn">
                                <HiShoppingBag size={29} />
                                <span className="basket-count flex align-center justify-center">{itemsCount}</span>
                            </Link>
                            <div className="text-end basket-count">
                                <p className="fs-14 text-uppercase">my cart</p>
                                <Link to="/basket" className="fw-7">
                                    $ <span className="basket-amount">{totalAmount}</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-main-bottom flex align-center justify-between">
                        <div className="navbar-cats-wrapper">
                            <div
                                className="navbar-cats-btn flex align-center text-white px-2 py-2"
                                onClick={handleShowCategories}
                            >
                                <AiOutlineBars />
                                <span className="text-uppercase mx-3 fs-13">all categories</span>
                                <BsCaretDownFill />
                            </div>

                            <ul className={`category-list ${showCategories ? 'show-category-list' : ''}`}>
                                {categories.map((category, index) => {
                                    return (
                                        <li className="category-item" key={index}>
                                            <Link
                                                to={`/category/${category.slug}`}
                                                className="category-item-link text-uppercase text-dark fs-12"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <ul className="navbar-nav flex align-center">
                            {categories.slice(0, 6).map((category, index) => {
                                return (
                                    <li className="nav-item" key={index}>
                                        <Link to={`/category/${category.slug}`} className="nav-link no-wrap">
                                            {category.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </nav>
    );
};

export default Navbar;
