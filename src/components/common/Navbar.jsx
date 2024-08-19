import { Link } from 'react-router-dom';
import '../../styles/Navbar.scss';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BsCaretDownFill, BsSearch } from 'react-icons/bs';
import { HiShoppingBag } from 'react-icons/hi';
import { AiOutlineBars } from 'react-icons/ai';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-top bg-secondary flex align-center">
                <div className="container w-100 flex align-center justify-end">
                    <Link to="/account" className="mx-4 flex align-center justify-end text-dark">
                        <FaUser size={14} />
                        <span className="mx-2 fs-13 text-uppercase ls-1">Linh</span>
                    </Link>
                    {/* <Link to='/login' className="mx-4 flex align-center login-btn justify-end text-dark">
                        <FaUser size={14} />
                        <span className="mx-2 fs-13 text-uppercase ls-1">Login</span>
                    </Link> */}
                    <button type="button" className="flex align-center justify-end text-dark">
                        <FiLogOut size={14} />
                        <span className="mx-2 fs-13 text-uppercase ls-1">Logout</span>
                    </button>
                </div>
            </div>

            <div className="navbar-main bg-primary">
                <div className="container">
                    <div className="navbar-main-top flex align-center justify-between">
                        <Link to="/" className="navbar-brand">
                            <span className="text-yellow fs-26 fw-6">Black</span>
                            <span className="text-white fs-26 fw-6">Friday.</span>
                        </Link>

                        <form className="navbar-search-form">
                            <div className="input-group bg-white">
                                <input type="text" className="form-control" placeholder="Search" />
                                <Link to={`search/`} className="btn btn-primary flex align-center text-white px-3">
                                    <BsSearch size={15} />
                                    <span className="fs-15 mx-2">Search</span>
                                </Link>
                            </div>
                        </form>

                        <div className="navbar-basket text-white flex align-center">
                            <Link to="basket" className="basket-btn">
                                <HiShoppingBag size={29} />
                                <span className="basket-count flex align-center justify-center">0</span>
                            </Link>
                            <div className="text-end basket-count">
                                <p className="fs-14 text-uppercase">my cart</p>
                                <Link to="/basket" className="fw-7">
                                    $ <span className="basket-amount">0.00</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-main-bottom flex align-center justify-between">
                        <div className="navbar-cats-wrapper">
                            <div className="navbar-cats-btn flex align-center text-white px-2 py-2">
                                <AiOutlineBars />
                                <span className="text-uppercase mx-3 fs-13">all categories</span>
                                <BsCaretDownFill />
                            </div>

                            <ul className={`category-list`}>
                                <li className="category-item">
                                    <Link
                                        to={`/category/`}
                                        className="category-item-link text-uppercase text-dark fs-12"
                                    >
                                        Category Name
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <ul className="navbar-nav flex align-center">
                            <li className="nav-item">
                                <Link to={`/category/`} className="nav-link no-wrap">
                                    text here
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
