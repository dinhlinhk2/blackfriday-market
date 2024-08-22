import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../context/authContext';
import '../../styles/LoginPage.scss';

function LoginPage() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { makeAuthRequest, dispatch, authErrorMsg, authData } = useContext(AuthContext);

    useEffect(() => {
        if (authData.isLoggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authData.isLoggedIn]);

    const notify = () => {
        toast('Logged in successfully');
    };

    function handleLogin(e, property) {
        setLoginData({
            ...loginData,
            [property]: e.target.value,
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        makeAuthRequest(dispatch, loginData);
    }

    function checkLoginStatus() {
        if (!authData.isLoggedIn) {
            notify();
        } else {
            toast.error(authErrorMsg);
        }
    }

    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-login">
                    <div className="login-content px-5 py-4">
                        <div className="login-title fs-20">Login/ Sign In</div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-element">
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    onChange={(e) => handleLogin(e, 'username')}
                                    value={loginData.username}
                                />
                            </div>
                            <div className="form-element">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    onChange={(e) => handleLogin(e, 'password')}
                                    value={loginData.password}
                                />
                            </div>

                            <button type="submit" onClick={checkLoginStatus} className="btn-login fs-16">
                                Login
                            </button>
                            <div className="login-error-msg text-center my-3">
                                <p className="text-danger"></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}

export default LoginPage;
