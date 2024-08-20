import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useContext } from 'react';

import './App.scss';
import { Home, Basket, Search, Error, Login, Account, ViewCategoryProductList, ViewProductSingle } from './views/index';
import { Navbar } from './components/common/index';
// import { authContext } from './context/authContext';
import ProtectedRoute from './routers/ProtectedRoute';
import PublicRoute from './routers/PublicRoute';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* private router */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/account" element={<Account />} />
                    <Route path="/basket" element={<Basket />} />
                </Route>
                {/* public router */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/search/:searchKey" element={<Search />} />
                    <Route path="/category/:categoryKey" element={<ViewCategoryProductList />} />
                    <Route path="/products/:id" element={<ViewProductSingle />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
