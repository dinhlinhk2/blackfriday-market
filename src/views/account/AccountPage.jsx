import { AuthContext } from '../../context/authContext';
import '../../styles/AccountPage.scss';
import { useContext } from 'react';
function AccountPage() {
    const { authData } = useContext(AuthContext);
    console.log(authData);

    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper">
                    <div className="account-details bg-white grid">
                        <div className="account-details-left">
                            <div className="info-elem">
                                <span className="info-elem-label">Full Name:</span>
                                <span className="info-elem-value">{`${
                                    authData.info?.firstName || authData.info?.family_name
                                } ${authData.info?.lastName || authData.info?.given_name}`}</span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Username</span>
                                <span className="info-elem-value">{authData.info?.usernam || authData.info?.name}</span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Email</span>
                                <span className="info-elem-value">{authData.info?.email}</span>
                            </div>
                            <div className="info-elem">
                                <span className="info-elem-label">Gender</span>
                                <span className="info-elem-value">
                                    {authData.info?.gender?.charAt(0).toUpperCase()}
                                    {authData.info?.gender?.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="account-details-right">
                            <img src={authData.info?.image || authData.info?.picture} alt="user_image" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AccountPage;
