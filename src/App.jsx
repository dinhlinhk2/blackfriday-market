import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useContext } from 'react';

import './App.scss';
import {
    Home,
    Basket,
    Search,
    Error,
    Login,
    Account,
    ViewCategoryProductList,
    ViewProductSingle,
    Checkout,
} from './views/index';
import { CheckoutSuccess, Footer, Navbar } from './components/common/index';
// import { authContext } from './context/authContext';
import ProtectedRoute from './routers/ProtectedRoute';
import PublicRoute from './routers/PublicRoute';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
    const { authData } = useContext(AuthContext);
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* private router */}
                <Route element={<ProtectedRoute authData={authData} />}>
                    <Route path="/account" element={<Account />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkoutsuccess" element={<CheckoutSuccess />} />
                </Route>
                {/* public router */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/search/:searchValue" element={<Search />} />
                    <Route path="/category/:categoryKey" element={<ViewCategoryProductList />} />
                    <Route path="/products/:id" element={<ViewProductSingle />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
